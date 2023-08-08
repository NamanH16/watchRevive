import { Form, Modal, Input } from "antd";
import React from "react";

function BitModal({ showBidModal, setShowBidModal, product, reloadData }) {
    const formRef = React.useRef(null);
    const rules = { required: true, message: "required" };
  return (
    <Modal onCancel={() => setShowBidModal(false)} open={showBidModal} centered width={600}>
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-cyan-200 text-center">New Bid</h1>

        <Form layout="vertical" ref={formRef}>
            <Form.Item label="Bid Amount" name='bidAmount' rules={rules}><Input /></Form.Item>
            <Form.Item label="Message" name='message' rules={rules}><Input.TextArea /></Form.Item>
            <Form.Item label="Mobile" name='mobile' rules={rules}><Input type="number"/></Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default BitModal;
