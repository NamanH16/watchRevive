import { Form, Modal, Input, message } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { PlaceNewBid } from "../../apicalls/products";

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
  const { user } = useSelector((state) => state.users);
  const formRef = React.useRef(null);
  const rules = [{ required: true, message: "required" }];
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        user: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success("Bid added successfully");
        reloadData();
        setShowBidModal(false);
      }else{
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  };

  return (
    <Modal onCancel={() => setShowBidModal(false)} open={showBidModal} centered width={600} onOk={() => formRef.current.submit()}>
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-cyan-200 text-center">New Bid</h1>

        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
            <Form.Item label="Bid Amount" name='bidAmount' rules={rules}><Input /></Form.Item>
            <Form.Item label="Message" name='message' rules={rules}><Input.TextArea /></Form.Item>
            <Form.Item label="Mobile" name='mobile' rules={rules}><Input type="number"/></Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default BidModal;