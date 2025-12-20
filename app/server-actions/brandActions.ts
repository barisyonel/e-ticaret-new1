'use server';

const MOCK_BRANDS = [
  { id: 1, name: 'Orijinal', slug: 'orijinal' },
  { id: 2, name: 'Yan Sanayi', slug: 'yan-sanayi' }
];

export async function getAllBrands(includeCounts: boolean = false) {
  const data = MOCK_BRANDS;
  // Hata vermemesi için hem array hem obje gibi davranan yapı
  return {
    data: data,
    success: true,
    map: (cb: any) => data.map(cb),
    length: data.length,
    [Symbol.iterator]: function* () { yield* data; }
  } as any;
}