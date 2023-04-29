
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
class OrderController {
    show(req, res, next) {
        var token = req.cookies.token;
        var ketqua = jwt.verify(token, 'mk');

        // Trong quá trình xử lý Promise, 
        /// các lệnh tiếp theo trong chương trình sẽ tiếp tục được thực hiện 
        /// mà không cần chờ Promise hoàn thành. 
        /// Nếu các lệnh này phụ thuộc vào giá trị trả về của Promise
        /// thì phải đợi Promise hoàn thành và xử lý kết quả trước khi thực hiện các lệnh tiếp theo. 
        Order.find({
            user_id: ketqua._id
        })
        .sort({order_date: 'desc'})
            .then(orders => {
                orders = orders.map(order => order.toObject())
                // Lấy danh sách các sản phẩm có id trong productIds (trả về dưới dạng promise)
                const getProductList = (productIds) => {
                    const promises = productIds.map((productId) => {
                        return Product.findById(productId);
                    });
                    return Promise.all(promises);
                };


                // Lấy danh sách các sản phẩm trong tất cả orders (trả về dưới dạng promise)
                var productList = orders.map(order => {
                    var products_id = order.product_list.map(product => product.product_id)
                    return getProductList(products_id);
                })

                /// Khi tất cả các promise thực hiện xong 
                Promise.all(productList)
                    .then(products => {
                        for (var i = 0; i < orders.length; i++) {
                            for (var j = 0; j < orders[i].product_list.length; j++) {
                                orders[i].product_list[j].product_name = products[i][j].name
                                orders[i].product_list[j].product_price = products[i][j].price
                                orders[i].product_list[j].product_main_image = products[i][j].main_image
                                //console.log(orders[i].product_list[j])
                            }
                            //console.log(orders[i].product_list)
                        }
                        res.render('./order', { orders })
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export default new OrderController;