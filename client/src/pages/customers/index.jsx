import React from 'react';
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from '@/controllers/api';
import { Header } from '@/components/Header';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: "_id",
    headerName: "ID",
    flex: 0.8,
  },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 0.6,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
    },
  },
  {
    field: "country",
    headerName: "Country",
    flex: 0.4,
  },
  {
    field: "occupation",
    headerName: "Occupation",
    flex: 0.8,
  },
  {
    field: "role",
    headerName: "Role",
    flex: 0.5,
  },
];

export const Customers = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetCustomersQuery();
  
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
