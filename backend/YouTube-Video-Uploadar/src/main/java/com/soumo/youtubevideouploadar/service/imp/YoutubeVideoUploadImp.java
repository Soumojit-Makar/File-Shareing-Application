package com.soumo.youtubevideouploadar.service.imp;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.http.*;
import com.soumo.youtubevideouploadar.service.YoutubeVideoUpload;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class YoutubeVideoUploadImp implements YoutubeVideoUpload {
    @Value("${youtube-v3-upload-url}")
    String YOUTUBE_VIDEO_URL;

    private static JsonFactory jsonFactory;
    private final HttpRequestFactory requestFactory;
    public YoutubeVideoUploadImp(JsonFactory jsonFactory, HttpRequestFactory requestFactory) {
        YoutubeVideoUploadImp.jsonFactory = jsonFactory;
        this.requestFactory = requestFactory;

    }
    public String uploadVideo(
            String title,
            String description,
            String visibility ,
            MultipartFile videoFile,
            String access_token,
            List<String> tags
    ) throws IOException {

        String json = getString(title, description, visibility,tags);
        HttpRequest request=requestFactory.buildPostRequest(
               new GenericUrl(YOUTUBE_VIDEO_URL),
                ByteArrayContent.fromString("application/json",json)
        );
        request.getHeaders().setAuthorization("Bearer " + access_token);
        request.getHeaders().setContentType("application/json");
        HttpResponse response=request.execute();
        // video metadata created
        //now upload video
        String videoUploadURl=response.getHeaders().getLocation();
        HttpRequest request2= requestFactory.buildPutRequest(
                new GenericUrl(videoUploadURl),
                new InputStreamContent("video/*",videoFile.getInputStream())
        );
        HttpResponse response2=request2.execute();
        return response.getHeaders().getLocation();
    }

    private static String getString(String title, String description, String visibility,List<String> tags) throws JsonProcessingException {
        Map <String, Object> snippet=Map.of(
                "snippet", Map.of(
                        "title", title,
                        "description", description,
                        "tags",tags,
                        "categoryId", 22
                ),
                "status", Map.of(
                        "privacyStatus", visibility,
                        "embeddable", true,
                        "license", "youtube"
                )
        );
        ObjectMapper objectMapper = new ObjectMapper(jsonFactory);
        return objectMapper.writeValueAsString(snippet);
    }
}
