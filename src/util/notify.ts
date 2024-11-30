import { reactive } from "vue";

// 定义通知类型
type NotifyType = "success" | "error" | "info" | "warning";

// 定义通知配置
type NotifyOptions = {
    type?: NotifyType;
    title: string;
    content: string;
    duration?: number; // 持续时间，单位ms，默认3000
    showClose?: boolean; // 是否显示关闭按钮，默认true
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"; // 通知位置
}

// 创建响应式通知列表
const notifications = reactive<Array<{ id: number } & NotifyOptions>>([]);

// 添加通知
function addNotification(options: NotifyOptions) {
    const id = Date.now(); // 唯一ID
    const defaultOptions: NotifyOptions = {
        type: "info",
        duration: 3000,
        showClose: true,
        position: "top-right",
        ...options,
    };
    notifications.push({ id, ...defaultOptions });

    // 自动移除通知
    if (defaultOptions.duration && defaultOptions.duration > 0) {
        setTimeout(() => {
            removeNotification(id);
        }, defaultOptions.duration);
    }
}

// 移除通知
function removeNotification(id: number) {
    const index = notifications.findIndex((notify) => notify.id === id);
    if (index !== -1) {
        notifications.splice(index, 1);
    }
}

export type { NotifyType, NotifyOptions };
export { notifications, addNotification, removeNotification };
