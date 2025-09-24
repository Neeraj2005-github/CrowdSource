package com.klef.cicd.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.klef.cicd.model.Admin;
import com.klef.cicd.model.Creator;
import com.klef.cicd.model.Donor;
import com.klef.cicd.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController 
{
  @Autowired
  private AdminService adminService;
  
  @PostMapping("/checkadminlogin")
  public ResponseEntity<?> checkadminlogin(@RequestBody Admin admin)
  {
	  try 
      {
          Admin a = adminService.checkadminlogin(admin.getUsername(), admin.getPassword());

          if (a!=null) 
          {
              return ResponseEntity.ok(a); // if login is successful
          } 
          else 
          {
              return ResponseEntity.status(401).body("Invalid Username or Password");
          }
      } 
      catch (Exception e) 
      {
    	  System.out.println(e.getMessage());
          return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
      }
  }
  
  @GetMapping("/viewalldonors")
  public ResponseEntity<List<Donor>> viewalldonors()
  {
	 List<Donor> donors = adminService.displaydonors();
	 return ResponseEntity.ok(donors);
  }
  
  @PostMapping("/addcampaigncreator")
  public ResponseEntity<String> addcampaigncreator(@RequestBody Creator creator)
  {
	   try
	   {
		  String output = adminService.addcampaigncreator(creator);
		  return ResponseEntity.ok(output);
	   }
	   catch(Exception e)
	   {
		   return ResponseEntity.status(500).body("Failed to Add Campaign Creator ... !!"); 
	   }
  }
  
  @GetMapping("/viewallcampaigncreators")
  public ResponseEntity<List<Creator>> viewallcampaigncreators()
  {
	 List<Creator> creators =  adminService.displaycampaigncreators();
	 return ResponseEntity.ok(creators);
  }
  
  @DeleteMapping("/deletedonor")
  public ResponseEntity<String> deletedonor(@RequestParam int did)
  {
	  try
	   {
		  String output = adminService.deletedonor(did);
		  return ResponseEntity.ok(output);
	   }
	   catch(Exception e)
	   {
		    return ResponseEntity.status(500).body("Failed to Delete Donor ... !!"); 
	   }
  }
  
  @DeleteMapping("/deletecreator")
  public ResponseEntity<String> deletecreator(@RequestParam int cid)
  {
	  try
	   {
		  String output = adminService.deletecreator(cid);
		  return ResponseEntity.ok(output);
	   }
	   catch(Exception e)
	   {
		    return ResponseEntity.status(500).body("Failed to Delete Creator ... !!"); 
	   }
  }
  
  @GetMapping("/donorcount")
  public ResponseEntity<Long> getDonorCount()
  {
      long count = adminService.displaydonorcount();
      return ResponseEntity.ok(count);
  }

  @GetMapping("/creatorcount")
  public ResponseEntity<Long> getCreatorCount()
  {
      long count = adminService.displaycreatorcount();
      return ResponseEntity.ok(count);
  }

  @GetMapping("/campaigncount")
  public ResponseEntity<Long> getCampaignCount()
  {
      long count = adminService.displaycampaigncount();
      return ResponseEntity.ok(count);
  }
  
}
