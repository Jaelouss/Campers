import campersApi from "@api";
import { CatalogList } from "@components/CatalogList/CatalogList";
import { FilterPanel } from "@components/FilterPanel/FilterPanel";
import { Loader } from "@components/Loader/Loader";
import type { CampersResponse } from "@type/camperApiTypes";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export const Catalog = () => {
  const [campers, setCampers] = useState<CampersResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();
  const paramsObj = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    setLoading(true);
    setError(false);

    campersApi
      .getAll(Object.fromEntries(searchParams.entries()))
      .then(setCampers)
      .catch(() => {
        setCampers({ total: 0, items: [] });
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <Section>
      {loading && <Loader />}
      <FilterPanel filters={paramsObj} />
      <CatalogList error={error} campers={campers ?? { total: 0, items: [] }} />
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  padding: 80px 0 32px;
  gap: 16px;
  @media (width>=768px) {
    gap: 32px;
    padding: 120px 0 52px;
  }
  @media (width>=1440px) {
    gap: 64px;
  }
`;
