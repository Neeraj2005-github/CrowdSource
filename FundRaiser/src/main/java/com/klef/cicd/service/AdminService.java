package com.klef.cicd.service;

import java.util.List;

import com.klef.cicd.model.Admin;
import com.klef.cicd.model.Creator;
import com.klef.cicd.model.Donor;

public interface AdminService 
{
  public Admin checkadminlogin(String username, String password);
  
  public String addcampaigncreator(Creator creator);
  public List<Creator> displaycampaigncreators();
  public String deletecreator(int cid);
  
  public List<Donor> displaydonors();
  public String deletedonor(int did);
  
  public long displaydonorcount();
  public long displaycreatorcount();
  public long displaycampaigncount();
}
