package br.com.loterica.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import br.com.loterica.service.FilesStorageService;
import br.com.loterica.service.ResponseMessage;

@Controller
@CrossOrigin("http://localhost:1238")
public class ImagemController {

	@Autowired
	FilesStorageService storageService;
	
	@PostMapping("/imagem") 
	public ResponseEntity<?> create(@RequestParam("file") MultipartFile img){
		
		String message = "";
	    try {
	      storageService.save(img);
	      
	      message = "Uploaded the file successfully: " + img.getOriginalFilename();
	      return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
	    } catch (Exception e) {
	      message = "Could not upload the file: " + img.getOriginalFilename() + "!";
	      return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
	    }

	}
	
	@GetMapping("/files/{filename}")
    public @ResponseBody FileSystemResource getFile(@PathVariable String filename) {
		try {
			Path path = Paths.get("uploads").resolve(filename);
			
			System.out.println("path result: "+ path);
			
			Resource resource = new UrlResource(path.toUri());
			
			System.out.println("Resource result: "+ resource);

			
			if (resource.exists() || resource.isReadable()) {
				return new FileSystemResource(resource.getFile()); 
			} else {
		        throw new RuntimeException("Could not read the file!");
			}
	    } catch (IOException e) {
	    	throw new RuntimeException("Error: " + e.getMessage());
	    }
    }
}
