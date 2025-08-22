import { useState } from "react";
import { CustomButton } from "@UI";
import styled from "styled-components";
import { BookingFormModal } from "@components/Modals/BookingFormModal";
import { DateRangePicker } from "@components";

export const BookForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <TitleWrapper>
          <Title>Book your campervan now</Title>
          <Description>
            Stay connected! We are always ready to help you.
          </Description>
        </TitleWrapper>
        <Wrapper>
          <Input required type="text" placeholder="Name*" name="Name" />
          <Input required type="email" placeholder="Email*" name="Email" />
          <DateRangePicker Input={Input} />
          <TextArea placeholder="Comment" name="Comment" />
        </Wrapper>
        <CustomButton type="Send" />
      </Form>
      <BookingFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Thank you for booking!"
        message="We will contact you soon. Have a great day!"
      />
    </>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;
const Title = styled.h2`
  color: var(--Main);
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
`;
const Description = styled.span`
  color: var(--Text);
  font-size: 16px;
  line-height: 24px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 24px;
  width: 100%;
  height: 100%;
`;
const Input = styled.input`
  padding: 18px;
  border-radius: 12px;
  background: var(--Inputs);
  width: 100%;
  border: none;
  outline: none;
`;
const TextArea = styled.textarea`
  padding: 18px;
  border-radius: 12px;
  background: var(--Inputs);
  width: 100%;
  border: none;
  outline: none;
  resize: none;
  height: 118px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  align-self: stretch;
`;
