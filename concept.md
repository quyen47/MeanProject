#1 .subscribe
    phương thức để nhận giá trị khi hàm trả về giá trị trong tương lai, ở đây chúng ta sử dụng bất đồng bộ nên lúc call function chưa xử lý xong chưa có dữ liệu. Nó chỉ trả về 1 đối tượng Promise tức là 1 lời hứa là tương lai xong thì sẽ trả về, có thể success hoặc error.
#2 .map
    1 method ở trong rxjs dùng để map 1 tập kết quả trả về ra 1 định dạng mà chúng ta cần, ở đây là json chẳng hạn để ra 1 biến thôi.
#3 req.query
    Get value from parameter at url to back-end