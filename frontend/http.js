import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000/",
});

instance.interceptors.request.use(
  (request) => {
    if (checkCookie("jwt-auth")) {
      request.headers["Authorization"] = "JWT " + getCookie("jwt-auth");
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);//for all requests coming from frontend it joins them and send cookie with it


export const getInventoryItems = () => {
    return new Promise((resolve) => {
        instance
            .get("/inventory-items/")
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                   
                    resolve(null);
                }
            })
            .catch(() => {
                console.log('error');
                resolve(null);
            });
    });
};

export const deleteInventoryItem = (id) => {
    return new Promise((resolve) => {
        instance
            .delete("/delete-inventory-item/" + id)
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                   
                    resolve(null);
                }
            })
            .catch(() => {
                console.log('error');
                resolve(null);
            });
    });
};

export const addInventoryItem = (name , price , quantity , restock_level) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("restock_level", restock_level);
      instance
          .post("/add-inventory-item/",data)
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};

export const updateIventoryItem = (id , name , price , quantity , restock_level) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("restock_level", restock_level);
    instance
        .put("/update-inventory-item/" + id , data)
        .then((response) => {
            if (response && response.data) {
                resolve(response.data);
            } else {
               
                resolve(null);
            }
        })
        .catch(() => {
            console.log('error');
            resolve(null);
        });
});
};

export const getProducts = () => {
    return new Promise((resolve) => {
        instance
            .get("/products/")
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                   
                    resolve(null);
                }
            })
            .catch(() => {
                console.log('error');
                resolve(null);
            });
    });
};

export const deleteProduct = (id) => {
    return new Promise((resolve) => {
        instance
            .delete("/delete-product/" + id)
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                   
                    resolve(null);
                }
            })
            .catch(() => {
                console.log('error');
                resolve(null);
            });
    });
};

export const addProduct = (name , price , quantity , restock_level) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("restock_level", restock_level);
      instance
          .post("/add-product/",data)
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};

export const updateProduct = (id , name , price , quantity , restock_level) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("restock_level", restock_level);
    instance
        .put("/update-product/" + id , data)
        .then((response) => {
            if (response && response.data) {
                resolve(response.data);
            } else {
               
                resolve(null);
            }
        })
        .catch(() => {
            console.log('error');
            resolve(null);
        });
});
};



export function getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString();
  }
  
  export function deleteCookie(name) {
    setCookie(name, "", -1);
  }
  
  export function checkCookie(name) {
    return getCookie(name) !== "";
  }

  export const login = (username, password) => {
    return new Promise((resolve) => {
      const data = new FormData();
      data.append("username", username);
      data.append("password", password);
      instance
        .post("/token-auth/", data)
        .then((response) => {
          if (response && response.data) {
            resolve({
              isSuccessful: true,
              message: "Login successful",
              data: response.data,
            });
          } else {
            resolve({
              isSuccessful: false,
              message: "Some error has occurred you might have put your credentials wrong or missed any feild.Try Again.",
              data: null,
            });
          }
        })
        .catch((error) => {
          resolve({
            isSuccessful: false,
            message: error.response.data.non_field_errors[0],
            data: null,
          });
        });
    });
  };
  

export const getProductionInformation = () => {
    return new Promise((resolve) => {
        instance
            .get("/production-management/")
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data);
                } else {
                   
                    resolve(null);
                }
            })
            .catch(() => {
                console.log('error');
                resolve(null);
            });
    });
};

export const deleteProductionInformation = (id) => {
  return new Promise((resolve) => {
      instance
          .delete("/delete-production-management/" + id)
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};


export const updateProductionInformation = (id , inventoryId ,quantity_used) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("quantity_used", quantity_used);
    data.append("inventoryId", inventoryId);
    instance
        .put("/update-production-management/" + id , data)
        .then((response) => {
            if (response && response.data) {
                resolve(response.data);
            } else {
               
                resolve(null);
            }
        })
        .catch(() => {
            console.log('error');
            resolve(null);
        });
});
};


export const addProductionInformation = (productId , inventoryId , quantity_used) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("productId", productId);
    console.log();
    data.append("inventoryId", inventoryId);
    data.append("quantity_used", quantity_used);
      instance
          .post("/add-production-management/",data)
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};

export const getCustomer = () => {
  return new Promise((resolve) => {
      instance
          .get("/customer/")
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};

export const getOrderDetail = () => {
  return new Promise((resolve) => {
      instance
          .get("/order-detail/")
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};

export const addOrderDetail = (customerId , date_ordered) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("customerId", customerId);
    data.append("date_ordered", date_ordered);
      instance
          .post("/add-order-detail/",data)
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};


export const deleteOrderDetail = (id) => {
  return new Promise((resolve) => {
      instance
          .delete("/delete-order-detail/" + id)
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};

export const updateOrderDetail = (id, date_ordered) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("date_ordered", date_ordered);
    instance
        .put("/update-order-detail/" + id , data)
        .then((response) => {
            if (response && response.data) {
                resolve(response.data);
            } else {
               
                resolve(null);
            }
        })
        .catch(() => {
            console.log('error');
            resolve(null);
        });
});
};

export const getOrderItem = () => {
  return new Promise((resolve) => {
      instance
          .get("/order-item/")
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};

export const deleteOrderItem = (id) => {
  return new Promise((resolve) => {
      instance
          .delete("/delete-order-item/" + id)
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};

export const addOrderItem = (productId , orderDetailId , quantity_ordered) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("productId", productId);
    console.log();
    data.append("orderDetailId", orderDetailId);
    data.append("quantity_ordered", quantity_ordered);
      instance
          .post("/add-order-item/",data)
          .then((response) => {
              if (response && response.data) {
                  resolve(response.data);
              } else {
                 
                  resolve(null);
              }
          })
          .catch(() => {
              console.log('error');
              resolve(null);
          });
  });
};

export const updateOrderItem = (id , productId ,quantity_ordered) => {
  return new Promise((resolve) => {
    const data = new FormData();
    data.append("quantity_ordered", quantity_ordered);
    data.append("productId", productId);
    instance
        .put("/update-order-item/" + id , data)
        .then((response) => {
            if (response && response.data) {
                resolve(response.data);
            } else {
               
                resolve(null);
            }
        })
        .catch(() => {
            console.log('error');
            resolve(null);
        });
});
};

export default instance;