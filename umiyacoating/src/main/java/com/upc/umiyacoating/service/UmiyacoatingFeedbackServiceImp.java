package com.upc.umiyacoating.service;

import com.upc.umiyacoating.model.UmiyacoatingFeedback;
import com.upc.umiyacoating.repository.UmiyacoatingFeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UmiyacoatingFeedbackServiceImp implements UmiyacoatingFeedbackService{

    @Autowired
    private UmiyacoatingFeedbackRepository feedbackRepository;
    @Override
    public UmiyacoatingFeedback saveFeedback(UmiyacoatingFeedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<UmiyacoatingFeedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}
