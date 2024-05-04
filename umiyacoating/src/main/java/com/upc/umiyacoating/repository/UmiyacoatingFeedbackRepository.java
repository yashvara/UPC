package com.upc.umiyacoating.repository;

import com.upc.umiyacoating.model.UmiyacoatingFeedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UmiyacoatingFeedbackRepository extends JpaRepository<UmiyacoatingFeedback, Integer> {
}
