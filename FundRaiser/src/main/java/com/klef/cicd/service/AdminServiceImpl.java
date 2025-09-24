package com.klef.cicd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.cicd.model.Admin;
import com.klef.cicd.model.Creator;
import com.klef.cicd.model.Donor;
import com.klef.cicd.repository.AdminRepository;
import com.klef.cicd.repository.CreatorRepository;
import com.klef.cicd.repository.CampaignRepository;
import com.klef.cicd.repository.DonorRepository;

@Service
public class AdminServiceImpl implements AdminService
{
	@Autowired
    private AdminRepository adminRepository;
	
	@Autowired
    private CreatorRepository creatorRepository;
	
	@Autowired
	private DonorRepository donorRepository;
	
	@Autowired
	private CampaignRepository campaignRepository;
	
	@Override
	public Admin checkadminlogin(String username, String password) 
	{
		return adminRepository.findByUsernameAndPassword(username, password);
	}

	@Override
	public String addcampaigncreator(Creator creator) 
	{
		creatorRepository.save(creator);
		return "Campaign Creator Added Successfully";
	}

	@Override
	public List<Creator> displaycampaigncreators() 
	{
		return creatorRepository.findAll();
	}

	@Override
	public List<Donor> displaydonors() 
	{
		return donorRepository.findAll();
	}

	@Override
	public String deletedonor(int did) 
	{
	    Optional<Donor> donor = donorRepository.findById(did);
	    
	    if (donor.isPresent()) 
	    {	
	        donorRepository.deleteById(did);
	        return "Donor Deleted Successfully";
	    } 
	    else 
	    {
	        return "Donor ID Not Found";
	    }
	}

	@Override
	public String deletecreator(int cid) 
	{
        Optional<Creator> creator = creatorRepository.findById(cid);
	    
	    if (creator.isPresent()) 
	    {	
	        creatorRepository.deleteById(cid);
	        return "Creator Deleted Successfully";
	    } 
	    else 
	    {
	        return "Creator ID Not Found";
	    }
	}

	@Override
	public long displaydonorcount() 
	{
		return donorRepository.count();
	}

	@Override
	public long displaycreatorcount() 
	{
		return creatorRepository.count();
	}

	@Override
	public long displaycampaigncount() 
	{
		return campaignRepository.count();
	}
}
