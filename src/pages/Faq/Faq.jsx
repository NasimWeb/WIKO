import "./Faq.css";
import PagesHeader from "../../components/Module/PagesHeader/PagesHeader";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import { useQuery } from "react-query";

function Faq() {
  const [expanded, setExpanded] = useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const fetchFags = async () => {
    return await fetch("https://wiko.pythonanywhere.com/content/faqs/")
      .then((res) => res.json())
      .then((data) => data);
  };

  const { data } = useQuery("Fags", fetchFags);

  return (
    <>
      <PagesHeader currentRoute={"سوالات متداول"} bg={'/assets/images/bandeau-access-2021-desktop.jpg'} />
      <div className="container px-20 mx-auto my-20 py-10">
        <div className="flex flex-col gap-4 ">
          {data?.map((faq) => {
            return (
              <Accordion key={faq.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  expanded={expanded}
                  onChange={handleExpansion}
                  slots={{ transition: Fade }}
                  slotProps={{ transition: { timeout: 400 } }}
                  sx={{
                    "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
                    "& .MuiAccordionDetails-root": {
                      display: expanded ? "block" : "none",
                    },
                  }}
                >
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails>{faq.answer}</AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Faq;
