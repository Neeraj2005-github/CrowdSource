package com.klef.cicd.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.klef.cicd.model.BookCampaign;
import com.klef.cicd.model.Donor;

@Repository
public interface BookCampaignRepository extends JpaRepository<BookCampaign, Integer>
{
    public List<BookCampaign> findByDonor(Donor donor);
    public BookCampaign findByProviderOrderId(String providerOrderId);
    
    @Query("SELECT b from BookCampaign b where b.campaign.creator.id = ?1")
    public List<BookCampaign> getbookingsbyCreator(int cid);
    
    @Modifying
    @Transactional
    @Query("UPDATE BookCampaign b SET b.status = ?1 WHERE b.id = ?2")
    public int updateStatusById(String status, int id);
}
