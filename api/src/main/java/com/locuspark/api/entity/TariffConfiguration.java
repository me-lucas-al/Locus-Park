package com.locuspark.api.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "tariff_configurations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class TariffConfiguration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UUID id;

    @ManyToOne(optional = false)
    @JoinColumn(name= "company_id", nullable = false)
    private Company company;

    @Column(nullable = false)
    private Integer toleranceMinutes;

    @Column(name = "first_hour_value", nullable = false, precision = 10, scale = 2)
    private BigDecimal firstHourValue;

    @Column(name = "additional_fraction_value", nullable = false, precision = 10, scale = 2)
    private BigDecimal additionalFractionValue;

    @Column(name = "overnight_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal overnightFee;

    @Column(name = "lost_ticket_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal lostTicketFee;
}

