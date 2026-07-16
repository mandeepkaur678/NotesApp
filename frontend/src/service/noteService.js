import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../utils/api";

export const NOTES_QUERY_KEY = ["notes"];

export const getNotes = async () => {
  const { data } = await api.get("/notes");
  return data ?? [];
};

export const useNotesQuery = () =>
  useQuery({
    queryKey: NOTES_QUERY_KEY,
    queryFn: getNotes,
  });

export const useCreateNoteMutation = (options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNote) => {
      const { data } = await api.post("/notes/", newNote);
      return data;
    },
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: NOTES_QUERY_KEY });
      options.onSuccess?.(...args);
    },
    onError: options.onError,
  });
};

export const useDeleteNoteMutation = (id, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete(`/notes/${id}`),
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: NOTES_QUERY_KEY });
      options.onSuccess?.(...args);
    },
    onError: options.onError,
  });
};

export const useUpdateNoteMutation = (id, options = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedNote) => {
      const { data } = await api.put(`/notes/${id}`, updatedNote);
      return data;
    },
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({ queryKey: NOTES_QUERY_KEY });
      options.onSuccess?.(...args);
    },
    onError: options.onError,
  });
};
