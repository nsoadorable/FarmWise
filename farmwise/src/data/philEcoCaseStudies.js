const caseStudies = [
  {
    id: 1,
    title: 'Low-Cost Drip Irrigation (Bukidnon)',
    description: 'Smallholder vegetable farmers using a simple gravity-fed drip system saw ≈15 % higher yields and up to 30 % water savings versus hand-watering.',
    costSavings: 30,      // % water saving
    yieldIncrease: 15,    // % yield bump
    sourceUrl: 'https://www.researchgate.net/publication/284341940_Farmers\'_experiences_with_low-pressure_drip_irrigation_for_vegetable_production_in_southeast_asia_and_the_pacific'  // :contentReference[oaicite:0]{index=0}
  },
  {
    id: 2,
    title: 'System of Rice Intensification (Bohol)',
    description: 'Implementation of SRI methods reduced water use by 25–50 % and tripled rice yields to ~12 t/ha compared to conventional flooding.',
    costSavings: 50,      // max water saving
    yieldIncrease: 200,   // from ~4 t/ha to ~12 t/ha = +200 %
    sourceUrl: 'https://en.wikipedia.org/wiki/System_of_Rice_Intensification'  // :contentReference[oaicite:1]{index=1}
  },
  {
    id: 3,
    title: 'Organic Fertilizer Cooperatives (Batangas)',
    description: 'Farmer co-ops producing on-farm compost reduced chemical fertilizer costs by ≈35 % while maintaining yields within 5 % of synthetic-fertilized plots.',
    costSavings: 35,
    yieldIncrease: 0,     // roughly same yields
    sourceUrl: 'https://hvcdp.da.gov.ph/wp-content/uploads/2022/05/DA-CAR-TECHNOGUIDE-IN-PRODUCTION-_-MANAGEMENT-OF-ORGANIC-HIGHLAND-VEGETABLES.pdf'  // :contentReference[oaicite:2]{index=2}
  }
];

export default caseStudies;