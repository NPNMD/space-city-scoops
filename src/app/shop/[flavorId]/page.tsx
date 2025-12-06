import React from 'react';
import Background from '../../../components/Background';
import { FLAVORS } from '../../../lib/flavors';
import ProductDetailClient from './ProductDetailClient';

// Generate static params for all flavors
export function generateStaticParams() {
  return FLAVORS.map((flavor) => ({
    flavorId: flavor.id,
  }));
}

export default function ProductDetailPage({ params }: { params: { flavorId: string } }) {
  return (
    <>
      <Background />
      <ProductDetailClient flavorId={params.flavorId} />
    </>
  );
}
