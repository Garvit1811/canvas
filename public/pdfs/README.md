# PDF Documents Directory

Place your PDF documents in this directory to make them accessible from the evictions map.

## Required Documents

1. **EvictionMaps_2025.pdf**
   - Provincial eviction process maps
   - Detailed flowcharts showing step-by-step eviction processes for each province

2. **Eviction_Report.pdf** (or Eviction_Report.docx converted to PDF)
   - Analysis and methodology report
   - Complete explanation of scoring methodology and analysis

3. **Technical_Rubric.pdf** (or Technical_Rubric.docx converted to PDF)
   - Technical rubric document
   - Scoring criteria for each of the 10 indicators

## File Naming

The application expects these exact filenames:
- `/pdfs/EvictionMaps_2025.pdf`
- `/pdfs/Eviction_Report.pdf`
- `/pdfs/Technical_Rubric.pdf`

If you use different filenames, update the paths in:
`src/CanadaEvictionsScoringMap.jsx` (look for the `PDF_DOCUMENTS` constant)

## Converting DOCX to PDF

If you have .docx files, you can convert them to PDF using:
- Microsoft Word (Save As > PDF)
- Google Docs (File > Download > PDF)
- Online converters (various free options)
- Command line tools (e.g., LibreOffice: `libreoffice --headless --convert-to pdf filename.docx`)
