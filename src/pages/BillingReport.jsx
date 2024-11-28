import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import axiosInstance from "../utils/axiosInstance";
import Chip from "@mui/material/Chip";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ReceiptIcon from "@mui/icons-material/Receipt";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useSnackbar } from "../utils/useSnackbar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import ImageIcon from "@mui/icons-material/Image";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[400],
    color: theme.palette.common.black,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    fontWeight: `bold`,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: `1px solid ${theme.palette.divider}`,
    borderLeft: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`,
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

function BillingReport() {
  const [billingData, setBillingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalSize, setTotalSize] = useState(0);
  const [expandedRow, setExpandedRow] = useState(null);
  const [detailData, setDetailData] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [agentBillingData, setAgentBillingData] = useState([]);
  const [isAgentLoading, setIsAgentLoading] = useState(true);
  const [agentPage, setAgentPage] = useState(0);
  const [agentRowsPerPage, setAgentRowsPerPage] = useState(10);
  const [agentTotalSize, setAgentTotalSize] = useState(0);
  const [expandedAgentRow, setExpandedAgentRow] = useState(null);
  const [agentDetailData, setAgentDetailData] = useState(null);
  const [openPaymentMethodDialog, setOpenPaymentMethodDialog] = useState(false);
  const [selectedBillingId, setSelectedBillingId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentRemark, setPaymentRemark] = useState("");
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [confirmMethod, setConfirmMethod] = useState("");
  const [confirmRemark, setConfirmRemark] = useState("");
  const [confirmImages, setConfirmImages] = useState([]);
  const [selectedConfirmId, setSelectedConfirmId] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [paymentImages, setPaymentImages] = useState([]);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axiosInstance.get(
          `/billing/company?page=${page}&size=${rowsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setBillingData(response.data.data);
        setTotalSize(response.data.page.totalSize);
      } catch (error) {
        console.error("Error fetching billing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBillingData();
  }, [page, rowsPerPage]);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/thb.json"
        );
        const data = await response.json();
        setExchangeRate(data.thb.usdt);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };
    fetchExchangeRate();
  }, []);

  // useEffect(() => {
  //   const fetchAgentBillingData = async () => {
  //     try {
  //       const token = localStorage.getItem("authToken");
  //       const response = await axiosInstance.get(
  //         `/billing/agent?page=${agentPage}&size=${agentRowsPerPage}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       setAgentBillingData(response.data.data);
  //       setAgentTotalSize(response.data.page.totalSize);
  //     } catch (error) {
  //       console.error("Error fetching agent billing data:", error);
  //     } finally {
  //       setIsAgentLoading(false);
  //     }
  //   };

  //   fetchAgentBillingData();
  // }, [agentPage, agentRowsPerPage]);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "warning";
      case "SUCCESS":
        return "success";
      case "FAILED":
        return "error";
      default:
        return "default";
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetail = async (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
      setDetailData(null);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get(`/billing/company/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setDetailData(response.data);
      setExpandedRow(id);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  const handleOpenPaymentDialog = (payment, billingId) => {
    setSelectedPayment({ ...payment, billingId });
    setOpenPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setOpenPaymentDialog(false);
    setSelectedPayment(null);
  };

  const handleAgentChangePage = (event, newPage) => {
    setAgentPage(newPage);
  };

  const handleAgentChangeRowsPerPage = (event) => {
    setAgentRowsPerPage(parseInt(event.target.value, 10));
    setAgentPage(0);
  };

  const handleAgentViewDetail = async (id) => {
    if (expandedAgentRow === id) {
      setExpandedAgentRow(null);
      setAgentDetailData(null);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.get(`/billing/agent/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setAgentDetailData(response.data);
      setExpandedAgentRow(id);
    } catch (error) {
      console.error("Error fetching agent detail:", error);
    }
  };

  const handleOpenPaymentMethod = (id) => {
    setSelectedBillingId(id);
    setOpenPaymentMethodDialog(true);
    setPaymentMethod("");
    setPaymentRemark("");
  };

  const handleClosePaymentMethod = () => {
    setOpenPaymentMethodDialog(false);
    setSelectedBillingId(null);
    setPaymentMethod("");
    setPaymentRemark("");
  };

  const handlePaymentSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        `/billing/master/${selectedBillingId}/payment`,
        {
          method: paymentMethod,
          remark: paymentRemark,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error submitting payment:", error);
      setOpenPaymentMethodDialog(false);

      if (error.response?.data?.message === "This billing already proceed.") {
        showSnackbar("รายการบิลนี้ถูกดำเนินการไปแล้ว", "error");
      } else {
        showSnackbar(
          "เกิดข้อผิดพลาดในการทำรายการ กรุณาลองใหม่อีกครั้ง",
          "error"
        );
      }
    }
  };

  const handleConfirmBilling = (id) => {
    setSelectedConfirmId(id);
    setOpenConfirmDialog(true);
    setConfirmMethod("");
    setConfirmRemark("");
    setConfirmImages([]);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setSelectedConfirmId(null);
    setConfirmMethod("");
    setConfirmRemark("");
    setConfirmImages([]);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setConfirmImages([...confirmImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setConfirmImages(confirmImages.filter((_, i) => i !== index));
  };

  const handleConfirmSubmit = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("method", confirmMethod);
      formData.append("remark", confirmRemark);

      confirmImages.forEach((image) => {
        formData.append("image[]", image);
      });

      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        `/billing/agent/${selectedConfirmId}/confirm`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        showSnackbar("ยืนยันการชำระเงินสำเร็จ", "success");
        handleCloseConfirmDialog();

        const fetchAgentBillingData = async () => {
          const response = await axiosInstance.get(
            `/billing/agent?page=${agentPage}&size=${agentRowsPerPage}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          setAgentBillingData(response.data.data);
          setAgentTotalSize(response.data.page.totalSize);
        };

        await fetchAgentBillingData();
      }
    } catch (error) {
      console.error("Error confirming billing:", error);

      if (error.response?.data?.message === "This billing already proceed.") {
        showSnackbar("รายการบิลนี้ถูกดำเนินการไปแล้ว", "error");
      } else if (error.response?.status === 400) {
        showSnackbar("ข้อมูลไม่ถูกต้อง กรุณาตวจสอบและลองใหม่อีกครั้ง", "error");
      } else {
        showSnackbar(
          "เกิดข้อผิดพลาดในการยืนยันการชำระเงิน กรุณาลองใหม่อีกครั้ง",
          "error"
        );
      }
    } finally {
      handleCloseConfirmDialog();
      setIsLoading(false);
    }
  };

  const handleViewImages = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        `/billing/agent/${id}/image`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const imageUrls = Object.values(response.data);
      setPaymentImages(imageUrls);
      setOpenImageDialog(true);
    } catch (error) {
      console.error("Error fetching payment images:", error);
      if (error.response?.status === 500) {
        showSnackbar(error.response.data.message, "warning");
      } else {
        showSnackbar("ไม่พบรูปภาพการชำระเงิน", "warning");
      }
    }
  };

  const handleExportCSV = async (id) => {
    try {
      const billing = agentBillingData.find((bill) => bill.id === id);
      const transaction_id = billing?.transaction_id || "unknown";

      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        `/billing/agent/${id}/export`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const csvContent = response.data;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `agent_billing_report_${id}_${transaction_id}.csv`
      );
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      showSnackbar("ดาวน์โหลดรายงานสำเร็จ", "success");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      showSnackbar("เกิดข้อผิดพลาดในการดาวน์โหลดรายงาน", "error");
    }
  };

  const renderMasterStatusButton = (row) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Chip
        label={
          row.payment.status === "PENDING" ? "PENDING" : row.payment.status
        }
        color={getStatusColor(row.payment.status)}
        size="small"
      />
      {row.payment.status !== "PENDING" && (
        <Tooltip title="ดูรายละเอียดการชำระเงิน">
          <IconButton
            size="small"
            onClick={() => handleOpenPaymentDialog(row.payment, row.id)}
          >
            <ReceiptIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );

  const renderAgentStatusButton = (row) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Chip
        label={
          row.payment.status === "PENDING" ? "PENDING" : row.payment.status
        }
        color={getStatusColor(row.payment.status)}
        size="small"
      />
      {row.payment.status !== "PENDING" && (
        <>
          <Tooltip title="ดูรายละเอียดการชำระเงิน">
            <IconButton
              size="small"
              onClick={() => handleOpenPaymentDialog(row.payment, row.id)}
            >
              <ReceiptIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="ดูรูปภาพการชำระเงิน">
            <IconButton size="small" onClick={() => handleViewImages(row.id)}>
              <ImageIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="ดาวน์โหลด CSV">
            <IconButton size="small" onClick={() => handleExportCSV(row.id)}>
              <FileDownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );

  const renderConfirmButton = (row) =>
    row.payment.status === "PENDING" ? (
      <Button
        variant="contained"
        size="small"
        onClick={() => handleConfirmBilling(row.id)}
        color="info"
      >
        CONFIRM BILLING
      </Button>
    ) : (
      "-"
    );

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      sx={{
        gap: 2,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4">รายงาน Billing</Typography>

      <Box sx={{ bgcolor: "white", p: 2, boxShadow: 1 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2, bgcolor: "#F5F3E8" }}>
              <b>Commpany Billing</b>
            </Typography>
            <Table sx={{ minWidth: 700 }} aria-label="billing table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Transaction ID
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    วันที่หมดอายุ
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    จำนวนเงิน (THB)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "1rem" }}>
                            ค่าเงินที่แสดงเป็นการประมาณการ ณ รอบวันปัจจุบัน
                            เท่านั้น
                            กรุณาตรวจสอบอัตราแลกเปลี่ยนที่แท้จริงในรายละเอียดการชำระเงิน
                          </Typography>
                        }
                        arrow
                      >
                        <Box
                          component="span"
                          sx={{
                            ml: 0.5,
                            color: "warning.main",
                            fontSize: "1rem",
                            cursor: "help",
                          }}
                        >
                          ⓘ
                        </Box>
                      </Tooltip>
                      จำนวนเงิน (USDT)
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">จัดการ</StyledTableCell>
                  <StyledTableCell align="center">สถานะ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billingData.map((row) => (
                  <React.Fragment key={row.id}>
                    <StyledTableRow>
                      <StyledTableCell align="center">{row.id}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.transaction_id}
                        <Button
                          size="small"
                          onClick={() => handleViewDetail(row.id)}
                          sx={{ ml: 1 }}
                          variant={
                            expandedRow === row.id ? "outlined" : "contained"
                          }
                          color="primary"
                        >
                          ดูรายละเอียด
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(row.expired_in).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <b>{Number(row.amount).toLocaleString()}</b>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <b>
                          ~{" "}
                          {exchangeRate
                            ? Number(row.amount * exchangeRate).toFixed(2)
                            : "-"}
                        </b>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.payment.status === "PENDING" ? (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleOpenPaymentMethod(row.id)}
                            color="info"
                          >
                            PAYMENT
                          </Button>
                        ) : (
                          "-"
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {renderMasterStatusButton(row)}
                      </StyledTableCell>
                    </StyledTableRow>
                    <TableRow>
                      <TableCell
                        style={{ padding: 0, backgroundColor: "#FFFDF7" }}
                        colSpan={7}
                      >
                        <Collapse
                          in={expandedRow === row.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ m: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              รายละเอียด Billing
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>ลำดับ</StyledTableCell>
                                  <StyledTableCell>ค่ายเกมส์</StyledTableCell>
                                  <StyledTableCell align="right">
                                    จำนวนเงิน
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    หน่วย
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    รวม
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {detailData?.items.map((item) => (
                                  <StyledTableRow key={item.order}>
                                    <StyledTableCell>
                                      {item.order}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {Number(item.amount).toLocaleString()}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {item.unit}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {Number(item.total).toLocaleString()}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={-1}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="แถวต่อหน้า"
              labelDisplayedRows={({ from, to }) => `${from}-${to}`}
              showFirstButton={false}
              showLastButton={false}
            />
          </TableContainer>
        )}
      </Box>

      {/* <Box sx={{ bgcolor: "white", p: 2, boxShadow: 1 }}>
        {isAgentLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ p: 2, bgcolor: "#E8F0F5" }}>
              <b>Agent Billing</b>
            </Typography>
            <Table sx={{ minWidth: 700 }} aria-label="agent billing table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">
                    Transaction ID
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    วันที่หมดอายุ
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    จำนวนเงิน (THB)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: 1,
                      }}
                    >
                      <Tooltip
                        title={
                          <Typography sx={{ fontSize: "1rem" }}>
                            ค่าเงินที่แสดงเป็นการประมาณการ ณ รอบวันปัจจุบัน
                            เท่านั้น
                            กรุณาตรวจสอบอัตราแลกเปลี่ยนที่แท้จริงในรายละเอียดการชำระเงิน
                          </Typography>
                        }
                        arrow
                      >
                        <Box
                          component="span"
                          sx={{
                            ml: 0.5,
                            color: "warning.main",
                            fontSize: "1rem",
                            cursor: "help",
                          }}
                        >
                          ⓘ
                        </Box>
                      </Tooltip>
                      จำนวนเงิน (USDT)
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">จัดการ</StyledTableCell>
                  <StyledTableCell align="center">สถานะ</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {agentBillingData.map((row) => (
                  <React.Fragment key={row.id}>
                    <StyledTableRow>
                      <StyledTableCell align="center">{row.id}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.transaction_id}
                        <Button
                          size="small"
                          onClick={() => handleAgentViewDetail(row.id)}
                          sx={{ ml: 1 }}
                          variant={
                            expandedAgentRow === row.id
                              ? "outlined"
                              : "contained"
                          }
                          color="primary"
                        >
                          ดูรายละเอียด
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {new Date(row.expired_in).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <b>{Number(row.amount).toLocaleString()}</b>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <b>
                          ~{" "}
                          {exchangeRate
                            ? Number(row.amount * exchangeRate).toFixed(2)
                            : "-"}
                        </b>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.payment.status === "PENDING" ? (
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleConfirmBilling(row.id)}
                            color="info"
                          >
                            CONFIRM BILLING
                          </Button>
                        ) : (
                          "-"
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {renderAgentStatusButton(row)}
                      </StyledTableCell>
                    </StyledTableRow>
                    <TableRow>
                      <TableCell
                        style={{ padding: 0, backgroundColor: "#E8F0F5" }}
                        colSpan={7}
                      >
                        <Collapse
                          in={expandedAgentRow === row.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ m: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              รายละเอียด Billing
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <StyledTableCell>ลำดับ</StyledTableCell>
                                  <StyledTableCell>ค่ายเกมส์</StyledTableCell>
                                  <StyledTableCell align="right">
                                    จำนวนเงิน
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    หน่วย
                                  </StyledTableCell>
                                  <StyledTableCell align="right">
                                    รวม
                                  </StyledTableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {agentDetailData?.items.map((item) => (
                                  <StyledTableRow key={item.order}>
                                    <StyledTableCell>
                                      {item.order}
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      {item.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {Number(item.amount).toLocaleString()}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {item.unit}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                      {Number(item.total).toLocaleString()}
                                    </StyledTableCell>
                                  </StyledTableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={-1}
              rowsPerPage={agentRowsPerPage}
              page={agentPage}
              onPageChange={handleAgentChangePage}
              onRowsPerPageChange={handleAgentChangeRowsPerPage}
              labelRowsPerPage="แถวต่อหน้า"
              labelDisplayedRows={({ from, to }) => `${from}-${to}`}
              showFirstButton={false}
              showLastButton={false}
            />
          </TableContainer>
        )}
      </Box> */}

      <Dialog open={openPaymentDialog} onClose={handleClosePaymentDialog}>
        <DialogTitle>
          รายละเอียดการชำระเงิน - ID {selectedPayment?.billingId || "-"}
        </DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Box
              sx={{
                minWidth: 300,
                pt: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography>
                <strong>Payment ID:</strong> {selectedPayment.paid_id || "-"}
              </Typography>
              <Typography>
                <strong>วันที่ชำระ:</strong>{" "}
                {selectedPayment.paid_at
                  ? new Date(selectedPayment.paid_at).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )
                  : "-"}
              </Typography>
              <Typography>
                <strong>เวลา:</strong>{" "}
                {selectedPayment.paid_at
                  ? new Date(selectedPayment.paid_at).toLocaleString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                  : "-"}
              </Typography>
              <Typography>
                <strong>สถานะ:</strong>{" "}
                {selectedPayment.status === "SUCCESS" ? (
                  <Chip label="SUCCESS" color="success" size="small" />
                ) : (
                  selectedPayment.status || "-"
                )}
              </Typography>
              <Typography>
                <strong>วิธีการชำระเงิน:</strong>{" "}
                {selectedPayment.method || "-"}
              </Typography>
              <Typography>
                <strong>จำนวนเงิน:</strong>{" "}
                {selectedPayment.amount
                  ? Number(selectedPayment.amount).toLocaleString()
                  : "-"}
              </Typography>
              <Typography>
                <strong>สกุลเงิน:</strong> {selectedPayment.currency || "-"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentDialog}>ปิด</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPaymentMethodDialog}
        onClose={handleClosePaymentMethod}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>เลือกวิธีการชำระเงิน - ID {selectedBillingId}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>วิธีการชำระเงิน</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="วิธีการชำระเงิน"
              >
                <MenuItem value="BANK">ธนาคาร</MenuItem>
                <MenuItem value="CRYPTO">คริปโต</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="หมายเหตุ"
              value={paymentRemark}
              onChange={(e) => setPaymentRemark(e.target.value)}
              multiline
              rows={2}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                bgcolor: "warning.light",
                p: 1.5,
                borderRadius: 1,
                mt: 1,
              }}
            >
              <WarningAmberIcon color="warning" />
              <Typography
                sx={{
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                }}
              >
                โปรดตรวจสอบข้อมูลการชำระเงินก่อนยืนยัน
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePaymentMethod}>ยกเลิก</Button>
          <Button
            onClick={handlePaymentSubmit}
            variant="contained"
            disabled={!paymentMethod}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>ยืนยันารชำระเงิน - ID {selectedConfirmId}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>วิธีการชำระเงิน</InputLabel>
              <Select
                value={confirmMethod}
                onChange={(e) => setConfirmMethod(e.target.value)}
                label="วิธีการชำระเงิน"
              >
                <MenuItem value="BANK">ธนาคาร</MenuItem>
                <MenuItem value="CRYPTO">คริปโต</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="หมายเหตุ"
              value={confirmRemark}
              onChange={(e) => setConfirmRemark(e.target.value)}
              multiline
              rows={2}
            />

            <Box>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                อัพโหลดรูปภาพ
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {confirmImages.map((image, index) => (
                  <Box
                    key={index}
                    sx={{
                      position: "relative",
                      width: 100,
                      height: 100,
                    }}
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`preview ${index}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        bgcolor: "background.paper",
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>ยกเลิก</Button>
          <Button
            onClick={handleConfirmSubmit}
            variant="contained"
            disabled={!confirmMethod || confirmImages.length === 0}
          >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openImageDialog}
        onClose={() => setOpenImageDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>รูปภาพการชำระเงิน</DialogTitle>
        <DialogContent>
          {paymentImages.length > 0 ? (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: 2,
                p: 2,
                "& img": {
                  width: "100%",
                  height: "250px", // กำหนดความสูงคงที่
                  objectFit: "contain",
                  backgroundColor: "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  },
                },
              }}
            >
              {paymentImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`หลักฐานการชำระเงิน ${index + 1}`}
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </Box>
          ) : (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography color="text.secondary">
                ไม่พบรูปภาพการชำระเงิน
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenImageDialog(false)}>ปิด</Button>
        </DialogActions>
      </Dialog>
      <SnackbarComponent />
    </Box>
  );
}

export default BillingReport;
