package com.klef.cicd.service;

import java.util.List;

import com.klef.cicd.model.BookCampaign;
import com.klef.cicd.model.Donor;
import com.klef.cicd.model.Campaign;

public interface DonorService 
{
  public String donorregistration(Donor donor);
  
  public Donor checkdonorlogin(String username, String password);
  
  public String donorupdateprofile(Donor donor);
  
  public List<Campaign> viewallcampaigns();
  
  public Donor getDonorById(int did);
  public Campaign getCampaignById(int cid);
  
  public String bookcampaign(BookCampaign bookCampaign);
  
  public List<BookCampaign> getbookedcampaignsByDonor(int did);
}
