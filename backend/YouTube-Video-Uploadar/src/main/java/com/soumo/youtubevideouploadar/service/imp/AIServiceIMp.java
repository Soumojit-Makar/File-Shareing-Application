package com.soumo.youtubevideouploadar.service.imp;


import com.soumo.youtubevideouploadar.service.AIService;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
@Service
public class AIServiceIMp implements AIService {
    private OllamaChatModel chatClient;
    public AIServiceIMp(OllamaChatModel chatClient) {
        this.chatClient = chatClient;
    }
    @Override
    public Map<String, Object> generateMetadata(String title) {
        String prompt = """
            Generate YouTube metadata for the topic: "%s"

            Format:
            Title: <generated title>
            Description: <short description>
            Tags: <comma,separated,tags>
        """.formatted(title);
        String response=chatClient.call(prompt);
        String[] parts = response.split("(?i)Title:|Description:|Tags:");
        if (parts.length < 4) {
            throw new RuntimeException("Unexpected response format: " + response);
        }

        String generatedTitle = parts[1].trim();
        String description = parts[2].trim();
        List<String> tags = Arrays.stream(parts[3].trim().split(","))
                .map(String::trim)
                .toList();

        return Map.of(
                "title", generatedTitle,
                "description", description,
                "tags", tags
        );
    }
}
