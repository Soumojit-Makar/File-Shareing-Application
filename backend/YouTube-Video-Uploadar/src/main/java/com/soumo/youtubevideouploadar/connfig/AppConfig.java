package com.soumo.youtubevideouploadar.connfig;

import com.fasterxml.jackson.core.JsonFactory;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {
    @Bean
    public JsonFactory jsonFactory() {
        return new JsonFactory();
    }
    @Bean
    public HttpTransport httpTransport() {
        return new NetHttpTransport();
    }
    @Bean
    public HttpRequestFactory requestFactory() {
        return httpTransport().createRequestFactory();
    }
}
