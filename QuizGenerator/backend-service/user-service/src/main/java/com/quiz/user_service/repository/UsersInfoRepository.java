package com.medixpress.user_service.repository;

import com.medixpress.user_service.entity.Customer;
import com.medixpress.user_service.entity.UsersInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface UsersInfoRepository extends JpaRepository<UsersInfo,Long> {

    Optional<UsersInfo> findByUserNameAndRole (String phoneNumber,String role);
    Optional<UsersInfo> findByUserNameAndPassword(String userName,String password);
}
