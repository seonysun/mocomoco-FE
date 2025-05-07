import { ChangeEvent, useState } from 'react';
import { Editor } from '@tiptap/react';
import { FocusTrap } from 'focus-trap-react';

import ColorPalette from '@components/moim/texteditor/colorpalette';
import { createMenuItems } from '@components/moim/texteditor/menuitem';

type ToolbarProps = {
  editor: Editor;
  onImageUpload: (file: File) => void;
};

const Toolbar = ({ editor, onImageUpload }: ToolbarProps) => {
  const [paletteType, setPaletteType] = useState<'text' | 'highlight' | null>(
    null,
  );
  const showColorPalette = paletteType !== null;

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img_url = reader.result as string;
      editor.chain().focus().setImage({ src: img_url }).run();
    };
    reader.readAsDataURL(file);

    onImageUpload(file);
  };

  const handleTextColor = (color: string | null) => {
    if (color === null) {
      editor.chain().focus().unsetColor().run();
    } else {
      editor.chain().focus().setColor(color).run();
    }
  };

  const handleHighlight = (color: string | null) => {
    if (color === null) {
      editor.chain().focus().unsetHighlight().run();
    } else {
      editor.chain().focus().setHighlight({ color }).run();
    }
  };

  const handleColorSelect = (color: string | null) => {
    if (paletteType === 'text') {
      handleTextColor(color);
    } else if (paletteType === 'highlight') {
      handleHighlight(color);
    }
    setPaletteType(null);
  };

  const menuItems = createMenuItems();

  return (
    <div className="relative flex items-center gap-3 border-main-header bg-main-default px-4 py-2">
      {menuItems.map(({ icon: Icon, action, isActive, title, disabled }) => (
        <button
          key={title}
          type="button"
          onClick={() =>
            action(editor, { setPaletteType, paletteType, handleImageUpload })
          }
          className={` ${isActive(editor, paletteType) ? 'text-red-400' : 'hover:scale-110 hover:bg-gray-200'} ${disabled?.(editor) ? 'cursor-not-allowed opacity-50' : ''} `}
          title={title}
          disabled={disabled?.(editor)}
          aria-label={title}
        >
          <Icon className="h-6 w-6" />
        </button>
      ))}
      {showColorPalette && (
        <FocusTrap
          active={showColorPalette}
          focusTrapOptions={{ initialFocus: false }}
        >
          <div className="border-purple absolute left-32 top-10 z-10 flex h-fit w-fit items-center justify-center border bg-white p-3">
            <ColorPalette onColorSelect={handleColorSelect} />
          </div>
        </FocusTrap>
      )}
    </div>
  );
};

export default Toolbar;
