package com.soumo.youtubevideouploadar.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface YoutubeVideoUpload {
    public String uploadVideo(
            String title,
            String description,
            String visibility ,
            MultipartFile videoFile,
            String access_token,
            List<String> tags
    )throws IOException;
}
