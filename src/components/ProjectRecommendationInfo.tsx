import React from 'react';
import {IProjectRecommendationInfo} from '../types';
import {Box} from '@mui/material';

interface ProjectRecommendationInfoProps extends IProjectRecommendationInfo {}

export default function ProjectRecommendationInfo({
  name,
  annualEnergySavings,
  totalInstallationCost,
  annualInstallationCost,
  percentageEmissionsReduction,
  rebateAmount,
}: ProjectRecommendationInfoProps) {
  function getTotalAnnualSavings() {
    return Math.round(annualEnergySavings - annualInstallationCost);
  }

  return (
    <Box sx={{width: '100%'}} pt={'8px'} pb={'8px'}>
      <Box sx={{fontWeight: 'bold', fontSize: '18px'}} mb={2} pl={'8px'} pr={'8px'}>
        {name}
      </Box>
      <Box sx={{borderRadius: '12px', backgroundColor: '#F3FFF8', padding: '16px'}} mb={2}>
        <Box sx={{fontWeight: 'bold', color: '#656363', fontSize: '12px'}} mb={1}>
          You can save an estimated
        </Box>
        <Box sx={{fontWeight: 'bold', color: '#2B6744', fontSize: '18px'}}>
          ${getTotalAnnualSavings()} / year
        </Box>
      </Box>
      <Box sx={{borderRadius: '12px', backgroundColor: '#F3FFF8', padding: '16px'}} mb={2}>
        <Box sx={{fontWeight: 'bold', color: '#656363', fontSize: '12px'}} mb={1}>
          With a reduction in CO2 emissions of
        </Box>
        <Box sx={{fontWeight: 'bold', color: '#2B6744', fontSize: '18px'}}>
          {percentageEmissionsReduction}%
        </Box>
      </Box>
      <Box sx={{borderRadius: '12px', backgroundColor: '#FEFEFE', padding: '16px'}}>
        <Box sx={{display: 'flex'}} mb={2}>
          <Box sx={{color: '#656363', fontSize: '12px', width: '75%'}}>Annual Energy Savings</Box>
          <Box sx={{color: '#2B6744', fontSize: '12px', width: '25%'}}>${annualEnergySavings}</Box>
        </Box>
        <Box sx={{display: 'flex'}} mb={2}>
          <Box sx={{color: '#656363', fontSize: '12px', width: '75%'}}>Total Installation Cost</Box>
          <Box sx={{color: '#A31E1E', fontSize: '12px', width: '25%'}}>
            ${totalInstallationCost}
          </Box>
        </Box>
        <Box sx={{display: 'flex'}} mb={2}>
          <Box sx={{color: '#656363', fontSize: '12px', width: '75%'}}>Estimated Rebate</Box>
          <Box sx={{color: '#2B6744', fontSize: '12px', width: '25%'}}>${rebateAmount}</Box>
        </Box>
        <Box sx={{display: 'flex'}}>
          <Box sx={{color: '#656363', fontSize: '12px', width: '75%'}}>
            {`Annual Financed Cost, After Rebate`}
          </Box>
          <Box sx={{color: '#A31E1E', fontSize: '12px', width: '25%'}}>
            ${annualInstallationCost}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
