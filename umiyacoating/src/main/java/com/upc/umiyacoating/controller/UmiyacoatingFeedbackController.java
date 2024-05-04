package com.upc.umiyacoating.controller;


import com.upc.umiyacoating.model.UmiyacoatingFeedback;
import com.upc.umiyacoating.service.UmiyacoatingFeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/feedback")
@CrossOrigin
public class UmiyacoatingFeedbackController {
    @Autowired
    private UmiyacoatingFeedbackService feedbackService;

    @PostMapping("/add")
    public String add(@RequestBody UmiyacoatingFeedback feedback){
        feedbackService.saveFeedback(feedback);
        return "New Feedback Added";
    }

    @GetMapping("/getAll")
    public List<UmiyacoatingFeedback> getAllFeedback() {
        return feedbackService.getAllFeedback();
    }
}
