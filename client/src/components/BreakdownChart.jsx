import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { useGetSalesQuery } from '@/controllers/api';

export const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  if( !data || isLoading) return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <CircularProgress color="inherit" />
    </Box>
  )

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales
    })
  );

  return (
    <Box
      height={isDashboard ? "400px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "325px" : undefined}
      minWidth={isDashboard ? "325px" : undefined}
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: theme.palette.secondary[200],
              },
            },
            legend: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            ticks: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
              },
              text: {
                fill: theme.palette.secondary[200],
              },
            },
          },
          legends: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          tooltip: {
            container: {
              color: theme.palette.primary[300],
            },
          },
        }}
        colors={{ scheme: 'yellow_orange_red' }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsTextColor={theme.palette.secondary[200]}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: isDashboard ? 50 : 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: theme.palette.primary[500],
                },
              },
            ],
          },
        ]}
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-82%, -180%)"
            : "translate(-50%, -100%)",
        }}
      >
        <Typography variant="h6">
          <Typography variant='span' fontWeight="bold" mr="0.1rem">$</Typography>
          {data.yearlySalesTotal}
        </Typography>
      </Box>
    </Box>
  )
}
