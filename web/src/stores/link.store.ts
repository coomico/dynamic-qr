import { defineStore } from "pinia";
import { ref } from "vue";

import type {
  Link,
  LinkRequest,
  UpdateLinkRequest
} from "@/interfaces";
import {
  createLink,
  deleteLink,
  fetchLink,
  fetchLinks,
  updateLink
} from "@/api";

import { codeToStatus } from "@/utils/converter";
import { catchError } from "@/utils/errorHandler";

export const useLinkStore = defineStore('link', () => {
  // state
  const link = ref<Link>();
  const links = ref<Link[]>([]);
  const loading = ref<boolean>(false);

  // actions
  function SetLink(l?: Link) {
    link.value = l;
  }

  function ReplaceLinks(ls?: Link[]) {
    links.value = ls ?? [];
  }

  async function CreateLink(data: LinkRequest) {
    loading.value = true;

    try {
      const { status } = await createLink(data);

      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false
    }
  }

  async function GetLink(id: string) {
    loading.value = true;

    try {
      const { status, data: { data } } = await fetchLink(id);
      SetLink(data);

      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false
    }
  }

  async function GetLinks() {
    loading.value = true;

    try {
      const { status, data: { data } } = await fetchLinks();
      ReplaceLinks(data);

      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false;
    }
  }

  async function UpdateLink(data: UpdateLinkRequest) {
    loading.value = true;

    try {
      if (link.value) {
        const { status } = await updateLink(link.value?._id, data);

        return codeToStatus(status);
      }
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false;
    }
  }

  async function DeleteLink(id: string) {
    loading.value = true;

    try {
      const { status } = await deleteLink(id);
      SetLink();

      return codeToStatus(status);
    } catch (error) {
      catchError(error);
    } finally {
      loading.value = false;
    }
  }

  return {
    link,
    links,
    loading,

    SetLink,
    ReplaceLinks,
    CreateLink,
    GetLink,
    GetLinks,
    UpdateLink,
    DeleteLink
  }
});