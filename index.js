// เมื่อคลิกที่ปุ่ม รถเข็นในเมนูร้านค้า
const cartButton = document.getElementById('open-cart');
cartButton.addEventListener('click', () => {
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
});

// เมื่อคลิกที่ปุ่ม ประวัติการสั่งซื้อ
const openHistoryButton = document.getElementById('open-history');
openHistoryButton.addEventListener('click', () => {
    Swal.fire({
        icon: 'error',
        title: 'แฮร่ ยังไม่ได้ทำจ้า',
        showConfirmButton: false,
        timer: 1500
    });
});


// เก็บข้อมูลสินค้าที่เลือกในตะกร้าเป็น array
const cart = [];

// อัปเดตแสดงรายการสินค้าในตะกร้า
function updateCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price} บาท`;
        cartList.appendChild(listItem);
        totalPrice += item.price;
    });

    // แสดงราคารวม
    const checkoutButton = document.getElementById('checkout');
    checkoutButton.textContent = `สั่งซื้อ (รวม ${totalPrice} บาท)`;
}

// เมื่อคลิกที่ปุ่ม "Add To Cart"
const addToCartButtons = document.querySelectorAll('.add-to-cart'); // ไม่ใช้ id เนื่องจาก id มีได้เพียง 1 ในหน้านั้นเลยใช้ class แทน
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const price = parseFloat(button.getAttribute('data-price'));
        const name = button.getAttribute('data-name');
        cart.push({ name, price });
        updateCart();

        Swal.fire({
            icon: 'success',
            title: 'เพิ่มสินค้าเข้าตะกร้าแล้ว',
            text: `${name} ถูกเพิ่มลงในตะกร้าแล้ว`,
            showConfirmButton: false,
            timer: 1500
        });
    });
});

// เมื่อคลิกที่ปุ่ม "สั่งซื้อ"
const checkoutButton = document.getElementById('checkout');
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'ไม่มีสินค้าในตะกร้า',
            text: 'กรุณาเลือกกลับไปเลือกสินค้าก่อน',
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        Swal.fire({
            icon: 'success',
            title: 'สั่งซื้อเรียบร้อยแล้ว!',
            text: 'ขอบพระคุณที่ใช้บริการ',
            showConfirmButton: false,
            timer: 1500
        });

        // ล้างตะกร้า
        cart.length = 0;
        updateCart();
    }
});

// เมื่อคลิกที่ปุ่มเคลียร์สินค้าจากตะกร้า
const clearCartButton = document.getElementById('clear-cart');
clearCartButton.addEventListener('click', () => {
    if (cart.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'ไม่มีสินค้าในตะกร้า',
            text: 'ตะกร้าสินค้าไม่มีอะไรเลย',
        });
    } else {
        cart.length = 0;
        updateCart();
        Swal.fire({
            icon: 'success',
            title: 'ลบสินค้าในตะกร้าแล้ว',
            text: 'ไปเลือกสินค้าต่อ',
        });
    }
});
