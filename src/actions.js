import axios from "axios";
import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";

let promiseToast = null;

export function notEkle(not) {
  console.log("notekle", not);
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  console.log("notsil", notId);
  return { type: NOT_SIL, payload: notId };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  promiseToast = toast.loading("Notunu aldım");
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        dispatch(notEkle(res.data.json));
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
        toast.update(promiseToast, {
          render: "Notunu ekledim!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  promiseToast = toast.loading("Notunu siliyorum");
  console.log(id);
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        dispatch(notSil(res.data.data));
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin
        toast.update(promiseToast, {
          render: "Silme işlemi başarılı",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      }
    })
    .catch((error) => console.log(error));
};
