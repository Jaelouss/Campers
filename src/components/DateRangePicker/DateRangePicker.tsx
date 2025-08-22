import React, { useState, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

interface DateRangePickerProps {
  Input: React.ComponentType<
    React.InputHTMLAttributes<HTMLInputElement> & {
      ref?: React.Ref<HTMLInputElement>;
    }
  >;
}

export const DateRangePicker = ({ Input }: DateRangePickerProps) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const CustomInput = forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
  >((props, ref) => <Input {...props} required ref={ref} />);

  return (
    <DateInputWrapper>
      <ReactDatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) =>
          setDateRange(update as [Date | null, Date | null])
        }
        placeholderText="Select booking dates"
        dateFormat="dd/MM/yyyy"
        customInput={<CustomInput />}
        popperPlacement="top"
      />
    </DateInputWrapper>
  );
};

const DateInputWrapper = styled.div`
  width: 100%;

  .react-datepicker-wrapper,
  .react-datepicker__input-container input {
    width: 100% !important;
    border-radius: 12px !important;
    background: var(--Inputs) !important;
    border: none !important;
    outline: none !important;
  }

  .react-datepicker {
    border: 1px solid var(--Main, #101828) !important;
    border-radius: 12px !important;
    box-shadow: none !important;
    font-family: inherit !important;
    color: var(--Main, #101828) !important;
  }

  .react-datepicker__triangle {
    fill: white !important;
    stroke: var(--Main, #101828) !important;
    stroke-width: 1px !important;
  }

  .react-datepicker__header {
    background: white !important;
    border-bottom: none !important;
    padding: 8px 0 !important;
    border-radius: 20px;
  }

  .react-datepicker__current-month {
    font-weight: 600 !important;
    font-size: 16px !important;
    color: var(--Main, #101828) !important;
  }

  .react-datepicker__day-names {
    border-bottom: 1px solid var(--Main, #101828) !important;
    padding-bottom: 4px !important;
    margin-bottom: 4px !important;
  }

  .react-datepicker__day-name {
    font-size: 12px !important;
    font-weight: 600 !important;
    color: var(--Text, #475467) !important;
    text-transform: uppercase !important;
  }

  .react-datepicker__month {
    display: grid !important;
    grid-template-rows: repeat(5, 1fr) !important;
  }

  .react-datepicker__day,
  .react-datepicker__month-text,
  .react-datepicker__quarter-text,
  .react-datepicker__year-text {
    border-radius: 50% !important;
    width: 36px !important;
    height: 36px !important;
    line-height: 36px !important;
    margin: 2px !important;
    font-size: 14px !important;
    color: var(--Main, #101828) !important;
  }

  .react-datepicker__day:hover,
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover,
  .react-datepicker__day--selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-range,
  .react-datepicker__month-text--range-start,
  .react-datepicker__month-text--range-end,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__quarter-text--range-start,
  .react-datepicker__quarter-text--range-end,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-range,
  .react-datepicker__year-text--range-start,
  .react-datepicker__year-text--range-end,
  .react-datepicker__day--in-selecting-range:not(
      .react-datepicker__day--in-range
    ),
  .react-datepicker__month-text--in-selecting-range:not(
      .react-datepicker__month-text--in-range
    ),
  .react-datepicker__quarter-text--in-selecting-range:not(
      .react-datepicker__quarter-text--in-range
    ),
  .react-datepicker__year-text--in-selecting-range:not(
      .react-datepicker__year-text--in-range
    ),
  .react-datepicker__day--selecting-range,
  .react-datepicker__month-text--selecting-range,
  .react-datepicker__quarter-text--selecting-range,
  .react-datepicker__year-text--selecting-range,
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background: var(--Text, #475467) !important;
    color: #fff !important;
  }

  .react-datepicker__navigation-icon::before,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    border-color: var(--Main, #101828);
    top: 6px !important;
    width: 14px !important;
    height: 14px !important;
  }

  .react-datepicker__day--today {
    font-weight: 600 !important;
    color: #fff !important;
  }

  .react-datepicker__navigation--previous::before,
  .react-datepicker__navigation--next::before {
    border-color: var(--Main, #101828) !important;
  }
`;
