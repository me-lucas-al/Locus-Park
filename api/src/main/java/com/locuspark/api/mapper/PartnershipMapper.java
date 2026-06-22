package com.locuspark.api.mapper;

import com.locuspark.api.entity.Partnership;
import com.locuspark.api.dto.response.PartnershipResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PartnershipMapper {
    @Mapping(source = "company.id", target = "companyId")
    PartnershipResponse toResponse(Partnership entity);
}