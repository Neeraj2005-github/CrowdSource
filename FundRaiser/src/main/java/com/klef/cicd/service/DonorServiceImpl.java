package com.klef.cicd.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.cicd.model.BookCampaign;
import com.klef.cicd.model.Donor;
import com.klef.cicd.model.Campaign;
import com.klef.cicd.repository.BookCampaignRepository;
import com.klef.cicd.repository.DonorRepository;
import com.klef.cicd.repository.CampaignRepository;

@Service
public class DonorServiceImpl implements DonorService
{
	@Autowired
    private DonorRepository donorRepository;
	
	@Autowired
	private CampaignRepository campaignRepository;
	
	@Autowired
	private BookCampaignRepository bookCampaignRepository;
	
	@Override
	public String donorregistration(Donor donor) 
	{
		donorRepository.save(donor);
		return "Donor Registered Successfully";
	}

	@Override
	public Donor checkdonorlogin(String username, String password) 
	{
		return donorRepository.findByUsernameAndPassword(username, password);
	}

	@Override
	public String donorupdateprofile(Donor donor) 
	{
		Optional<Donor> object = donorRepository.findById(donor.getId());
		String msg = null;
		
		if(object.isPresent())
		{
			Donor d = object.get();
			d.setName(donor.getName());
			d.setDob(donor.getDob());
			d.setMobileno(donor.getMobileno());
			d.setEmail(donor.getEmail());
			d.setPassword(donor.getPassword());
			d.setLocation(donor.getLocation());
			
			donorRepository.save(d);
			msg = "Donor Profile Updated Successfully";
		}
		else
		{
			msg = "Donor ID Not Found to Update";
		}
		return msg;
	}

	@Override
	public List<Campaign> viewallcampaigns() 
	{
	   return campaignRepository.findAll();
	}

	@Override
	public Donor getDonorById(int did) 
	{
		return donorRepository.findById(did).orElse(null);
	}

	@Override
	public Campaign getCampaignById(int cid) 
	{
		return campaignRepository.findById(cid).orElse(null);
	}

	@Override
	public String bookcampaign(BookCampaign bookCampaign) 
	{
		bookCampaignRepository.save(bookCampaign);
		return "Campaign Booked Successfully";
	}

	@Override
	public List<BookCampaign> getbookedcampaignsByDonor(int did) 
	{
		Donor donor = donorRepository.findById(did).orElse(null);
		return bookCampaignRepository.findByDonor(donor);
	}
}
