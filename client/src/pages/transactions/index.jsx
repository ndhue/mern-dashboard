import React, { useState } from 'react';
import { Box, LinearProgress, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from '@/controllers/api';
import { Header } from '@/components/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "userId",
    headerName: "User ID",
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 1,
  },
  {
    field: "products",
    headerName: "# of Products",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
];

export const Transactions = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetTransactionsQuery();
  
  return (
   <Box m="1.5rem 2.5rem">
    <Header title="CUSTOMERS" subtitle="List of Customers" />
    <Box
      mt="20px"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-columnHeaderTitle":{
          fontWeight: "semibold",
          fontSize: "13px"
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${theme.palette.secondary[200]} !important`,
        },
        "& .MuiDataGrid-cell:nth-of-type(7) .MuiDataGrid-cellContent": {
          textTransform: "uppercase"
        }
      }}
    >
      <DataGrid 
        loading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={data || []}
        columns={columns}
        slots={{ 
          toolbar: GridToolbar
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          ...data,
          pagination: { paginationModel: { pageSize: 20 } },
        }}
        pageSizeOptions={[20, 40, 60]}
      />
    </Box>
   </Box>
  )
}
