package com.upc.umiyacoating.service;

import com.upc.umiyacoating.model.UmiyacoatingFeedback;

import java.util.List;

public interface UmiyacoatingFeedbackService {
    public UmiyacoatingFeedback saveFeedback(UmiyacoatingFeedback feedback);
    public List<UmiyacoatingFeedback> getAllFeedback();
}
