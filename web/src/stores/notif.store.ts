import { defineStore } from "pinia";
import { ref } from "vue";

import { useToast } from '@/components/ui/toast/use-toast';

import type { Notif } from "@/interfaces";

export const useNotifStore = defineStore('notif', () => {
  const notif = ref<Notif>();

  function SetNotif(n: Notif) {
    notif.value = n;
  }

  function Notify(n?: Notif) {
    const { toast } = useToast();

    if (n) notif.value = n;

    toast({
      variant: notif.value?.status === 'success' ? 'default' : 'destructive',
      title: notif.value?.title,
      description: notif.value?.message
    })
  }

  return {
    notif,

    SetNotif,
    Notify
  }
});