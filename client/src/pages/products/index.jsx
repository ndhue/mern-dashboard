import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Pagination,
} from "@mui/material";
import { Header } from "@/components/Header";
import { useGetProductsQuery } from "@/controllers/api";
import usePagination from "@/components/Pagination";

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14, fontWeight: "bold" }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography 
          sx={{
            fontWeight: "bold",
            fontSize: 18
          }}
          variant="h5" 
          component="div"
        >
          {name}
        </Typography>
        <Typography sx={{ m: "0.5rem 0" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2" m="0.2rem 0">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const [page, setPage] = useState(1);
  const perPage = 8;
  const _data = usePagination(data, perPage);

  const handleChange = (e, p) => {
    setPage(p);
    _data.jump(p);
  };

  return (
    <Box m="1rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {_data.currentData().map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        >
          <CircularProgress color="inherit" />
      </Box>
      )}
      <Box display="flex" justifyContent="center" alignItems="center" margin="0.5rem 0">
        {data || !isLoading ? 
        <Pagination 
        count={Math.ceil(data?.length / perPage)}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange} /> : <></>
        }
      </Box>
    </Box>
  );
};