ObjC.import('AppKit');
ObjC.import('PDFKit');

function makeSheet(pdfPath, outDir) {
  const fm = $.NSFileManager.defaultManager;
  fm.createDirectoryAtPathWithIntermediateDirectoriesAttributesError(outDir, true, $(), null);
  const doc = $.PDFDocument.alloc.initWithURL($.NSURL.fileURLWithPath(pdfPath));
  const count = Number(doc.pageCount);
  const cols = 2, rows = 3, cellW = 640, cellH = 380, gap = 24, pad = 28;
  const sheetW = pad * 2 + cols * cellW + (cols - 1) * gap;
  const sheetH = pad * 2 + rows * cellH + (rows - 1) * gap;
  for (let base = 0, sheet = 1; base < count; base += cols * rows, sheet++) {
    const canvas = $.NSImage.alloc.initWithSize($.NSMakeSize(sheetW, sheetH));
    canvas.lockFocus;
    $.NSColor.colorWithWhiteAlpha(0.94, 1).set;
    $.NSRectFill($.NSMakeRect(0, 0, sheetW, sheetH));
    for (let j = 0; j < cols * rows && base + j < count; j++) {
      const page = doc.pageAtIndex(base + j);
      const thumb = page.thumbnailOfSizeForBox($.NSMakeSize(cellW, cellH), $.kPDFDisplayBoxMediaBox);
      const col = j % cols, row = Math.floor(j / cols);
      const x = pad + col * (cellW + gap);
      const y = sheetH - pad - (row + 1) * cellH - row * gap;
      $.NSColor.whiteColor.set;
      $.NSRectFill($.NSMakeRect(x, y, cellW, cellH));
      thumb.drawInRectFromRectOperationFraction($.NSMakeRect(x, y, cellW, cellH), $.NSZeroRect, $.NSCompositingOperationSourceOver, 1);
    }
    canvas.unlockFocus;
    const rep = $.NSBitmapImageRep.imageRepWithData(canvas.TIFFRepresentation);
    const png = rep.representationUsingTypeProperties($.NSBitmapImageFileTypePNG, $({}));
    png.writeToFileAtomically(`${outDir}/sheet-${String(sheet).padStart(2,'0')}.png`, true);
  }
}

makeSheet($.NSProcessInfo.processInfo.arguments.objectAtIndex(4).js,
          $.NSProcessInfo.processInfo.arguments.objectAtIndex(5).js);
