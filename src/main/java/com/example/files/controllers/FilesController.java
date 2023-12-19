package com.example.files.controllers;

import com.example.files.models.FileType;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/files")
public class FilesController {
    private Path root = Paths.get("");

    @GetMapping()
    public ResponseEntity<?> getFiles() {
        try {
            return ResponseEntity.ok(Files.walk(root, 1)
                    .filter(path -> !path.equals(root))
                    .map(root::relativize)
                    .map(Path::toFile)
                    .map(file -> {
                        return new com.example.files.models.File(
                                file.getName(),
                                file.isDirectory() ? FileType.DIRECTORY : FileType.FILE);
                    })
                    .collect(Collectors.toList()));
        } catch (IOException ioe) {
            System.out.println(ioe.getMessage());
            return ResponseEntity.badRequest()
                    .body("Ошибка! Невозможно получить файлы");
        }
    }

    @GetMapping("/{fileName}")
    public ResponseEntity<?> getFile(@PathVariable String fileName) {
        Path filePath = root.resolve(fileName);
        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}

