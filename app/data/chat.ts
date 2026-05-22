import type { IconName } from "@mekari/pixel3";

export type ChatContent = "document" | "image" | "map" | "text" | "video" | "contact";
export type ChatStatus = "unassigned" | "assigned" | "resolved" | "";

export interface ChatItem {
  iconName: IconName;
  senderName: string;
  timeStamp: string;
  sla: string;
  content: string;
  channelName: string;
  contentUnread: string;
  tag: string;
  contentType: ChatContent;
  status: ChatStatus;
  isShowSLA: boolean;
  isShowReplies: boolean;
}

export const CHAT_LIST_DATA: ChatItem[] = [
  {
    iconName: "WhatsApp",
    senderName: "Indra Pangestu",
    timeStamp: "17:30",
    sla: "",
    content:
      "Saya mau komplain soal mesin kopi yang saya beli bulan lalu. Mesin kopinya tidak mau memanaskan air sama sekali.",
    channelName: "Hummingbird Official",
    contentUnread: "2",
    tag: "",
    contentType: "text",
    status: "unassigned",
    isShowSLA: false,
    isShowReplies: false
  },
  {
    iconName: "Telegram",
    senderName: "Bambang Pratama",
    timeStamp: "16:54",
    sla: "",
    content: "Apakah mesin kopi ini bisa digunakan untuk kapsul?",
    channelName: "Hummingbird Official",
    contentUnread: "3",
    tag: "",
    contentType: "text",
    status: "unassigned",
    isShowSLA: false,
    isShowReplies: false
  },
  {
    iconName: "WhatsApp",
    senderName: "Wulan Fitriani",
    timeStamp: "16:50",
    sla: "",
    content: "Selamat pagi",
    channelName: "Hummingbird Official",
    contentUnread: "1",
    tag: "",
    contentType: "text",
    status: "assigned",
    isShowSLA: false,
    isShowReplies: false
  },
  {
    iconName: "WhatsApp",
    senderName: "Eka Surya",
    timeStamp: "16:15",
    sla: "",
    content: "Kami akan kirim katalog produk terbaru ke email Anda",
    channelName: "Hummingbird Official",
    contentUnread: "",
    tag: "",
    contentType: "document",
    status: "assigned",
    isShowSLA: false,
    isShowReplies: true
  },
  {
    iconName: "Instagram",
    senderName: "Siti Aisyah Putri",
    timeStamp: "15:30",
    sla: "",
    content: "Berapa lama pengiriman untuk wilayah Jakarta?",
    channelName: "Hummingbird Official",
    contentUnread: "1",
    tag: "",
    contentType: "text",
    status: "assigned",
    isShowSLA: false,
    isShowReplies: false
  },
  {
    iconName: "WhatsApp",
    senderName: "Maya Sari",
    timeStamp: "14:45",
    sla: "",
    content: "Garansi mesin kopi ini mencakup spare part selama 1 tahun",
    channelName: "Hummingbird Official",
    contentUnread: "",
    tag: "",
    contentType: "text",
    status: "assigned",
    isShowSLA: false,
    isShowReplies: true
  },
  {
    iconName: "WhatsApp",
    senderName: "Rudi Setiawan",
    timeStamp: "14:10",
    sla: "30m",
    content: "Apakah bisa COD untuk pesanan saya?",
    channelName: "Hummingbird Official",
    contentUnread: "",
    tag: "",
    contentType: "text",
    status: "assigned",
    isShowSLA: true,
    isShowReplies: false
  },
  {
    iconName: "X",
    senderName: "Indra Gunawan",
    timeStamp: "13:35",
    sla: "",
    content: "Kami sarankan untuk rutin membersihkan drip tray setiap minggu",
    channelName: "Hummingbird Official",
    contentUnread: "",
    tag: "",
    contentType: "text",
    status: "assigned",
    isShowSLA: false,
    isShowReplies: true
  },
  {
    iconName: "WhatsApp",
    senderName: "Ade Putra",
    timeStamp: "12:50",
    sla: "",
    content: "Ada masalah, mesin tiba-tiba mati saat membuat kopi.",
    channelName: "Hummingbird Official",
    contentUnread: "",
    tag: "",
    contentType: "text",
    status: "assigned",
    isShowSLA: false,
    isShowReplies: true
  },
  {
    iconName: "WhatsApp",
    senderName: "Tri Wulandari",
    timeStamp: "11:25",
    sla: "",
    content: "Stok filter yang Anda butuhkan tersedia, silakan lakukan pemesanan.",
    channelName: "Hummingbird Official",
    contentUnread: "",
    tag: "",
    contentType: "text",
    status: "assigned",
    isShowSLA: false,
    isShowReplies: false
  },
  {
    iconName: "WhatsApp",
    senderName: "Tri Wulandari",
    timeStamp: "11:12",
    sla: "",
    content: "Okayy",
    channelName: "Hummingbird Official",
    contentUnread: "",
    tag: "",
    contentType: "text",
    status: "resolved",
    isShowSLA: false,
    isShowReplies: true
  }
];
