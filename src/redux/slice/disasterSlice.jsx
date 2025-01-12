import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://uas-klien-api.vercel.app/api/v1/disaster"; // Ganti dengan URL API Anda

// Konfigurasi axios untuk menyertakan kredensial
const axiosInstance = axios.create({
  withCredentials: true, // Menambahkan kredensial pada setiap permintaan
});

// Thunks (Asynchronous Actions)
export const fetchDisasters = createAsyncThunk(
  "disasters/fetchDisasters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(API_URL);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch disasters"
      );
    }
  }
);

export const fetchDisasterById = createAsyncThunk(
  "disasters/fetchDisasterById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${id}`);
      const disastersResponse = await axiosInstance.get(API_URL); // Fetch all disasters
      return {
        disaster: response.data.data,
        disasters: disastersResponse.data.data, // Return both the single disaster and the list of disasters
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch disaster"
      );
    }
  }
);

export const createDisaster = createAsyncThunk(
  "disasters/createDisaster", // Nama action
  async (disasterData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Menambahkan data ke FormData
      formData.append("name", disasterData.name);
      formData.append("type", disasterData.type);
      formData.append("location", disasterData.location);
      formData.append("description", disasterData.description);
      formData.append("date", disasterData.date);

      // Menambahkan file gambar
      if (disasterData.files) {
        for (let i = 0; i < disasterData.files.length; i++) {
          formData.append("images", disasterData.files[i]);
        }
      }

      const response = await axiosInstance.post(`${API_URL}/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Mengembalikan response jika sukses
      return response.data;
    } catch (error) {
      // Menangani error
      return rejectWithValue(
        error.response?.data?.error || "Failed to create disaster"
      );
    }
  }
);

export const updateDisaster = createAsyncThunk(
  "disasters/updateDisaster",
  async ({ id, disasterData, files }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(disasterData).forEach((key) => {
        formData.append(key, disasterData[key]);
      });

      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("images", file);
        });
      }

      const response = await axiosInstance.patch(`${API_URL}/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data); // Tambahkan log di sini
      return response.data; // Pastikan mengembalikan data dengan struktur { success, message, data }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update disaster"
      );
    }
  }
);

export const deleteDisaster = createAsyncThunk(
  "disasters/deleteDisaster",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/${id}`);
      // Response berhasil hanya memiliki message dan success
      if (response.data.success) {
        return response.data; // Mengirimkan data response langsung
      } else {
        throw new Error("Failed to delete disaster");
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete disaster"
      );
    }
  }
);

// Slice
const disasterSlice = createSlice({
  name: "disasters",
  initialState: {
    disasters: [],
    disaster: null,
    isLoading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Disasters
      .addCase(fetchDisasters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDisasters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.disasters = action.payload;
      })
      .addCase(fetchDisasters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Fetch Disaster by ID
      .addCase(fetchDisasterById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDisasterById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.disaster = action.payload.disaster;
        state.disasters = action.payload.disasters;
      })
      .addCase(fetchDisasterById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Create Disaster
    // Action fulfilled (berhasil)
    builder.addCase(createDisaster.pending, (state) => {
      state.isLoading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(createDisaster.fulfilled, (state, action) => {
      state.isLoading = false;
      state.success = action.payload.message; // Menyimpan message dari response
      state.disasters.push(action.payload); // Menambahkan disaster baru ke daftar
    });
    // Action rejected (gagal)
    builder
      .addCase(createDisaster.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Menyimpan error dari response
      })

      // Update Disaster
      .addCase(updateDisaster.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDisaster.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message;

        // Validasi apakah `action.payload.data` ada sebelum mengakses `_id`
        const updatedDisaster = action.payload.data;
        if (updatedDisaster && updatedDisaster._id) {
          const index = state.disasters.findIndex(
            (disaster) => disaster._id === updatedDisaster._id
          );
          if (index !== -1) {
            state.disasters[index] = updatedDisaster;
          }
        } else {
          console.error("Invalid payload structure: ", action.payload);
        }
      })
      .addCase(updateDisaster.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Delete Disaster
      .addCase(deleteDisaster.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteDisaster.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = action.payload.message; // Menyimpan pesan sukses

        // Tidak perlu filter berdasarkan _id karena kita tidak mengembalikan data disaster yang dihapus
        state.disasters = state.disasters.filter(
          (disaster) => disaster._id !== action.meta.arg // Menghapus disaster dari daftar berdasarkan id
        );
      })

      .addCase(deleteDisaster.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = disasterSlice.actions;

export default disasterSlice.reducer;
