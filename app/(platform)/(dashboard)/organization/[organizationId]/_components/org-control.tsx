"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

export const OrgControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();
  
  useEffect(() => {

    if (!setActive) return;

    setActive({
      organization: params.organizationId as string,
    })

  }, [setActive, params.organizationId]);

  return null;
};

