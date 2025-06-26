package com.soumo.youtubevideouploadar.controller;

import com.soumo.youtubevideouploadar.service.AIService;
import com.soumo.youtubevideouploadar.service.YoutubeVideoUpload;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/video")
@CrossOrigin("*")
public class YoutubeVideoUploadController {
    private final YoutubeVideoUpload upload;
    private final AIService aiService;
    public YoutubeVideoUploadController(YoutubeVideoUpload upload, AIService aiService) {
        this.upload = upload;
        this.aiService = aiService;
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadVideo(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("visibility") String visibility,
            @RequestParam("videoFile") MultipartFile videoFile,
            @RequestHeader("Authorization") String access_token,
            @RequestParam("tags")List<String> tags
            ) throws IOException {
        return ResponseEntity.ok(
                upload.uploadVideo(
                        title,
                        description,
                        visibility,
                        videoFile,
                        access_token.replace("Bearer ", ""),
                        tags
                )
        );
    }
    @PostMapping("/generate-meta-data")
    public ResponseEntity<Map<String,Object>> generateMetadata(
            @RequestParam("title")String title
    ) {
        return new ResponseEntity<>(aiService.generateMetadata(title), HttpStatus.OK);
    }
}
