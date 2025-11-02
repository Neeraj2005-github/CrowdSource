package com.klef.cicd.model;

import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

@Entity
@Table(name = "bookcampaign_table")
public class BookCampaign 
{
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "campaign_id")
    private Campaign campaign;

    @ManyToOne
    @JoinColumn(name = "donor_id")
    private Donor donor;

    @Column(nullable = true)
    private String startdate;

    @Column(nullable = true)
    private String enddate;

    // Map the DB column donatedmoney to the friendly field name bookedcapacity
    @Column(name = "donatedmoney", nullable = false)
    private int bookedcapacity;

    @Column(nullable = false)
    private String status;

    // Keep DB column name donatingtime, expose as bookingtime in JSON and Java
    @CreationTimestamp
    @Column(name = "donatingtime", nullable = false)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime bookingtime;

    // getters / setters (note names match the new field names)

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Campaign getCampaign() { return campaign; }
    public void setCampaign(Campaign campaign) { this.campaign = campaign; }

    public Donor getDonor() { return donor; }
    public void setDonor(Donor donor) { this.donor = donor; }

    public String getStartdate() { return startdate; }
    public void setStartdate(String startdate) { this.startdate = startdate; }

    public String getEnddate() { return enddate; }
    public void setEnddate(String enddate) { this.enddate = enddate; }

    public int getBookedcapacity() { return bookedcapacity; }
    public void setBookedcapacity(int bookedcapacity) { this.bookedcapacity = bookedcapacity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getBookingtime() { return bookingtime; }
    public void setBookingtime(LocalDateTime bookingtime) { this.bookingtime = bookingtime; }

    @Override
    public String toString() {
        return "BookCampaign [id=" + id + ", campaign=" + campaign + ", donor=" + donor + ", startdate=" + startdate
                + ", enddate=" + enddate + ", bookedcapacity=" + bookedcapacity + ", status=" + status
                + ", bookingtime=" + bookingtime + "]";
    }
}
