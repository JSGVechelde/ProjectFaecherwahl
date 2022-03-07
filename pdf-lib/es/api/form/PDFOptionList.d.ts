import PDFDocument from "../PDFDocument";
import PDFPage from "../PDFPage";
import PDFFont from "../PDFFont";
import PDFField, { FieldAppearanceOptions } from "./PDFField";
import { AppearanceProviderFor } from "./appearances";
import { PDFRef, PDFAcroListBox } from "../../core";
/**
 * Represents an option list field of a [[PDFForm]].
 *
 * [[PDFOptionList]] fields are interactive lists of options. The purpose of an
 * option list is to enable users to select one or more options from a set of
 * possible options. Users are able to see the full set of options without
 * first having to click on the field (though scrolling may be necessary).
 * Clicking an option in the list will cause it to be selected and displayed
 * with a highlighted background. Some option lists allow users to select
 * more than one option (see [[PDFOptionList.isMultiselect]]).
 */
export default class PDFOptionList extends PDFField {
    /**
     * > **NOTE:** You probably don't want to call this method directly. Instead,
     * > consider using the [[PDFForm.getOptionList]] method, which will create
     * > an instance of [[PDFOptionList]] for you.
     *
     * Create an instance of [[PDFOptionList]] from an existing acroListBox and
     * ref
     *
     * @param acroComboBox The underlying `PDFAcroListBox` for this option list.
     * @param ref The unique reference for this option list.
     * @param doc The document to which this option list will belong.
     */
    static of: (acroListBox: PDFAcroListBox, ref: PDFRef, doc: PDFDocument) => PDFOptionList;
    /** The low-level PDFAcroListBox wrapped by this option list. */
    readonly acroField: PDFAcroListBox;
    private constructor();
    /**
     * Get the list of available options for this option list. These options will
     * be displayed to users who view this option list in a PDF reader.
     * For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * const options = optionList.getOptions()
     * console.log('Option List options:', options)
     * ```
     * @returns The options for this option list.
     */
    getOptions(): string[];
    /**
     * Get the selected options for this option list. These are the values that
     * were selected by a human user via a PDF reader, or programatically via
     * software.
     * For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * const selections = optionList.getSelected()
     * console.log('Option List selections:', selections)
     * ```
     * @returns The selected options for this option list.
     */
    getSelected(): string[];
    /**
     * Set the list of options that are available for this option list. These are
     * the values that will be available for users to select when they view this
     * option list in a PDF reader. Note that preexisting options for this
     * option list will be removed. Only the values passed as `options` will be
     * available to select.
     *
     * For example:
     * ```js
     * const optionList = form.getOptionList('planets.optionList')
     * optionList.setOptions(['Earth', 'Mars', 'Pluto', 'Venus'])
     * ```
     *
     * This method will mark this option list as dirty, causing its appearance
     * streams to be updated when either [[PDFDocument.save]] or
     * [[PDFForm.updateFieldAppearances]] is called. The updated streams will
     * display the options this field contains inside the widgets of this text
     * field (with selected options highlighted).
     *
     * **IMPORTANT:** The default font used to update appearance streams is
     * [[StandardFonts.Helvetica]]. Note that this is a WinAnsi font. This means
     * that encoding errors will be thrown if this field contains any options
     * with characters outside the WinAnsi character set (the latin alphabet).
     *
     * Embedding a custom font and passing it to
     * [[PDFForm.updateFieldAppearances]] or [[PDFOptionList.updateAppearances]]
     * allows you to generate appearance streams with characters outside the
     * latin alphabet (assuming the custom font supports them).
     *
     * @param options The options that should be available in this option list.
     */
    setOptions(options: string[]): void;
    /**
     * Add to the list of options that are available for this option list. Users
     * will be able to select these values in a PDF reader. In addition to the
     * values passed as `options`, any preexisting options for this option list
     * will still be available for users to select.
     * For example:
     * ```js
     * const optionList = form.getOptionList('rockets.optionList')
     * optionList.addOptions(['Saturn IV', 'Falcon Heavy'])
     * ```
     * This method will mark this option list as dirty. See
     * [[PDFOptionList.setOptions]] for more details about what this means.
     * @param options New options that should be available in this option list.
     */
    addOptions(options: string | string[]): void;
    /**
     * Select one or more values for this option list. This operation is analogous
     * to a human user opening the option list in a PDF reader and clicking on one
     * or more values to select them. This method will update the underlying state
     * of the option list to indicate which values have been selected. PDF
     * libraries and readers will be able to extract these values from the saved
     * document and determine which values were selected.
     * For example:
     * ```js
     * const optionList = form.getOptionList('best.superheroes.optionList')
     * optionList.select(['One Punch Man', 'Iron Man'])
     * ```
     * This method will mark this option list as dirty. See
     * [[PDFOptionList.setOptions]] for more details about what this means.
     * @param options The options to be selected.
     * @param merge Whether or not existing selections should be preserved.
     */
    select(options: string | string[], merge?: boolean): void;
    /**
     * Clear all selected values for this option list. This operation is
     * equivalent to selecting an empty list. This method will update the
     * underlying state of the option list to indicate that no values have been
     * selected.
     * For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * optionList.clear()
     * ```
     * This method will mark this option list as dirty. See
     * [[PDFOptionList.setOptions]] for more details about what this means.
     */
    clear(): void;
    /**
     * Returns `true` if the options of this option list are always displayed
     * in alphabetical order, irrespective of the order in which the options
     * were added to the option list. See [[PDFOptionList.enableSorting]] and
     * [[PDFOptionList.disableSorting]]. For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * if (optionList.isSorted()) console.log('Sorting is enabled')
     * ```
     * @returns Whether or not this option list is sorted.
     */
    isSorted(): boolean;
    /**
     * Always display the options of this option list in alphabetical order,
     * irrespective of the order in which the options were added to this option
     * list.
     * For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * optionList.enableSorting()
     * ```
     */
    enableSorting(): void;
    /**
     * Do not always display the options of this option list in alphabetical
     * order. Instead, display the options in whichever order they were added
     * to this option list. For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * optionList.disableSorting()
     * ```
     */
    disableSorting(): void;
    /**
     * Returns `true` if multiple options can be selected from this option list.
     * See [[PDFOptionList.enableMultiselect]] and
     * [[PDFOptionList.disableMultiselect]]. For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * if (optionList.isMultiselect()) console.log('Multiselect is enabled')
     * ```
     * @returns Whether or not multiple options can be selected.
     */
    isMultiselect(): boolean;
    /**
     * Allow users to select more than one option from this option list.
     * For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * optionList.enableMultiselect()
     * ```
     */
    enableMultiselect(): void;
    /**
     * Do not allow users to select more than one option from this option list.
     * For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * optionList.disableMultiselect()
     * ```
     */
    disableMultiselect(): void;
    /**
     * Returns `true` if the option selected by a user is stored, or "committed",
     * when the user clicks the option. The alternative is that the user's
     * selection is stored when the user leaves this option list field (by
     * clicking outside of it - on another field, for example). See
     * [[PDFOptionList.enableSelectOnClick]] and
     * [[PDFOptionList.disableSelectOnClick]]. For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * if (optionList.isSelectOnClick()) console.log('Select on click is enabled')
     * ```
     * @returns Whether or not options are selected immediately after they are
     *          clicked.
     */
    isSelectOnClick(): boolean;
    /**
     * Store the option selected by a user immediately after the user clicks the
     * option. Do not wait for the user to leave this option list field (by
     * clicking outside of it - on another field, for example). For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * optionList.enableSelectOnClick()
     * ```
     */
    enableSelectOnClick(): void;
    /**
     * Wait to store the option selected by a user until they leave this option
     * list field (by clicking outside of it - on another field, for example).
     * For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * optionList.disableSelectOnClick()
     * ```
     */
    disableSelectOnClick(): void;
    /**
     * Show this option list on the specified page. For example:
     * ```js
     * const ubuntuFont = await pdfDoc.embedFont(ubuntuFontBytes)
     * const page = pdfDoc.addPage()
     *
     * const form = pdfDoc.getForm()
     * const optionList = form.createOptionList('best.gundams')
     * optionList.setOptions(['Exia', 'Dynames', 'Kyrios', 'Virtue'])
     * optionList.select(['Exia', 'Virtue'])
     *
     * optionList.addToPage(page, {
     *   x: 50,
     *   y: 75,
     *   width: 200,
     *   height: 100,
     *   textColor: rgb(1, 0, 0),
     *   backgroundColor: rgb(0, 1, 0),
     *   borderColor: rgb(0, 0, 1),
     *   borderWidth: 2,
     *   rotate: degrees(90),
     *   font: ubuntuFont,
     * })
     * ```
     * This will create a new widget for this option list field.
     * @param page The page to which this option list widget should be added.
     * @param options The options to be used when adding this option list widget.
     */
    addToPage(page: PDFPage, options?: FieldAppearanceOptions): void;
    /**
     * Returns `true` if this option list has been marked as dirty, or if any of
     * this option list's widgets do not have an appearance stream. For example:
     * ```js
     * const optionList = form.getOptionList('some.optionList.field')
     * if (optionList.needsAppearancesUpdate()) console.log('Needs update')
     * ```
     * @returns Whether or not this option list needs an appearance update.
     */
    needsAppearancesUpdate(): boolean;
    /**
     * Update the appearance streams for each of this option list's widgets using
     * the default appearance provider for option lists. For example:
     * ```js
     * const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
     * const optionList = form.getOptionList('some.optionList.field')
     * optionList.defaultUpdateAppearances(helvetica)
     * ```
     * @param font The font to be used for creating the appearance streams.
     */
    defaultUpdateAppearances(font: PDFFont): void;
    /**
     * Update the appearance streams for each of this option list's widgets using
     * the given appearance provider. If no `provider` is passed, the default
     * appearance provider for option lists will be used. For example:
     * ```js
     * const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
     * const optionList = form.getOptionList('some.optionList.field')
     * optionList.updateAppearances(helvetica, (field, widget, font) => {
     *   ...
     *   return drawOptionList(...)
     * })
     * ```
     * @param font The font to be used for creating the appearance streams.
     * @param provider Optionally, the appearance provider to be used for
     *                 generating the contents of the appearance streams.
     */
    updateAppearances(font: PDFFont, provider?: AppearanceProviderFor<PDFOptionList>): void;
    private updateWidgetAppearance;
}
//# sourceMappingURL=PDFOptionList.d.ts.map