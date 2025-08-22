import { FilterPanel, Loader, CatalogList } from "@components";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "@store/campers/campersActions";
import {
  selectCampers,
  selectCampersError,
  selectCampersLoading,
} from "@store/campers/campersSelectors";
import type { AppDispatch } from "@store/store";
import type { CamperFilters } from "@type/camperApiTypes";
import { selectFilters } from "@store/filtersSlice/filtersSlice";

const convertFiltersToRecord = (
  filters: CamperFilters
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined) {
      result[key] = value.toString();
    }
  }
  return result;
};

export const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const savedFilters = useSelector(selectFilters);
  const campers = useSelector(selectCampers);
  const loading = useSelector(selectCampersLoading);
  const error = useSelector(selectCampersError);

  const paramsObj = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const effectiveParams = useMemo((): Record<string, string> | undefined => {
    if (
      Object.keys(paramsObj).length === 0 &&
      Object.keys(savedFilters).length > 0
    ) {
      return convertFiltersToRecord(savedFilters);
    }
    return Object.keys(paramsObj).length > 0 ? paramsObj : undefined;
  }, [paramsObj, savedFilters]);

  useEffect(() => {
    if (
      Object.keys(paramsObj).length === 0 &&
      Object.keys(savedFilters).length > 0
    ) {
      setSearchParams(convertFiltersToRecord(savedFilters));
    }
  }, [paramsObj, savedFilters, setSearchParams]);

  useEffect(() => {
    if (effectiveParams !== undefined) {
      dispatch(fetchCampers({ params: effectiveParams }));
    }
  }, [dispatch, effectiveParams]);

  return (
    <Section>
      {(loading || !campers) && <Loader />}
      <FilterPanel filters={effectiveParams || {}} />
      <CatalogList error={error} campers={campers} />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  padding: 80px 0 32px;
  gap: 16px;
  @media (width >= 768px) {
    gap: 32px;
    padding: 120px 0 52px;
  }
  @media (width >= 1440px) {
    gap: 64px;
  }
`;
