import React from 'react';
import Layout from 'react-styleguidist/src/rsg-components/Layout';
import Renderer from 'react-styleguidist/src/rsg-components/Layout/Renderer';

import * as elements from '../../src/components/elements';
import * as collections from '../../src/components/collections';
import * as views from '../../src/components/views';
import * as modules from '../../src/components/modules';
import { spring } from '../../src/components/animationUtils';

/**
 * Hack to avoid requiring semantic stuff in examples
 */
function globalizeCollections() {
    window.Field = collections.Field;
    window.Fields = collections.Fields;
    window.Form = collections.Form;

    window.Grid = collections.Grid;
    window.Row = collections.Row;
    window.Column = collections.Column;

    window.Message = collections.Message;

    window.Table = collections.Table;
    window.Td = collections.Td;
    window.Tr = collections.Tr;

    window.Breadcrumb = collections.Breadcrumb;
    window.BreadcrumbDivider = collections.BreadcrumbDivider;
    window.BreadcrumbSection = collections.BreadcrumbSection;
}

function globalizeElements() {
    window.Button = elements.Button;
    window.Buttons = elements.Buttons;
    window.IconButton = elements.IconButton;
    window.LabeledButton = elements.LabeledButton;
    window.SocialButton = elements.SocialButton;

    window.Divider = elements.Divider;

    window.Flag = elements.Flag;

    window.Header = elements.Header;

    window.SubHeader = elements.SubHeader;

    window.Icon = elements.Icon;
    window.Icons = elements.Icons;

    window.Image = elements.Image;
    window.Images = elements.Images;

    window.Input = elements.Input;

    window.Label = elements.Label;
    window.Labels = elements.Labels;
    window.Detail = elements.Detail;

    window.List = elements.List;
    window.ListItem = elements.ListItem;

    window.Loader = elements.Loader;

    window.Rail = elements.Rail;

    window.Reveal = elements.Reveal;

    window.Segment = elements.Segment;
    window.Segments = elements.Segments;

    window.Step = elements.Step;
    window.Steps = elements.Steps;

    window.Actions = elements.Actions;
    window.Author = elements.Author;
    window.Container = elements.Container;
    window.Content = elements.Content;
    // window.Date = elements.Date // conflict with standard Date()
    window.Description = elements.Description;
    window.Meta = elements.Meta;
    window.Summary = elements.Summary;
    window.Text = elements.Text;
}

function globalizeModules() {
    window.Accordion = modules.Accordion;
    window.AccordionBody = modules.AccordionBody;
    window.AccordionTitle = modules.AccordionTitle;

    window.Checkbox = modules.Checkbox;
    window.CheckboxFields = modules.CheckboxFields;

    window.Dimmer = modules.Dimmer;
    window.Dimmable = modules.Dimmable;

    window.DropdownElement = modules.DropdownElement;
    window.DropdownMenu = modules.DropdownMenu;
    window.Select = modules.Select;
    window.Option = modules.Option;

    window.Modal = modules.Modal;

    window.Popup = modules.Popup;
    window.Bar = modules.Bar;
    window.Progress = modules.Progress;

    window.Rating = modules.Rating;

    window.Search = modules.Search;

    window.Tab = modules.Tab;
    window.TabMenu = modules.TabMenu;
    window.Tabs = modules.Tabs;
}

function globalizeViews() {
    window.Card = views.Card;
    window.Cards = views.Cards;

    window.Comment = views.Comment;
    window.Comments = views.Comments;

    window.Event = views.Event;
    window.Feed = views.Feed;

    window.Item = views.Item;
    window.Items = views.Items;

    window.Menu = views.Menu;
    window.MenuItem = views.MenuItem;

    window.Value = views.Value;
    window.Statistic = views.Statistic;
    window.Statistics = views.Statistics;
}

function globalizeSemantic() {
    globalizeCollections();
    globalizeElements();
    globalizeModules();
    globalizeViews();
    window.spring = spring;
}

export default function SemanticStyleGuide(props) {
    globalizeSemantic();
    const LayoutRenderer = Layout(Renderer);

    return (
        <LayoutRenderer {...props} />
    );
}
