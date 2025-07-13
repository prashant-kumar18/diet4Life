'use client';

import {
    Header,
    HeaderContainer,
    HeaderMenuButton,
    HeaderName,
    SideNavItems,
    SideNav,
    HeaderNavigation,
    HeaderSideNavItems,
    Tag,
    HeaderGlobalAction,
    HeaderGlobalBar,
    Modal,
    HeaderMenuItem,
    Theme,
} from '@carbon/react';
import { Information } from '@carbon/react/icons';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const tabs = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Add Patient', href: '/add' },

]

export const HeaderComponent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const Model = <Modal
        open={isOpen}
        modalHeading={
            <div>
                <strong className="modalHeader">
                    <span>Diet4Life</span> <b>Patient Manager</b>
                </strong>
            </div>
        }
        passiveModal
        onRequestClose={() => setIsOpen(false)}
    >
        <p className="licenseText">

        </p>
    </Modal>
    return (
        <Theme theme='g100'>
            <HeaderContainer
                render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                    <div>
                        <Header aria-label="Diet4Life">
                            <HeaderMenuButton
                                aria-label={isSideNavExpanded ? 'Close menu' : 'Open menu'}
                                onClick={onClickSideNavExpand}
                                isActive={isSideNavExpanded}
                                aria-expanded={isSideNavExpanded}
                            />
                            <HeaderName href="#" prefix="Diet4Life" id="product">
                                <Tag
                                    size="sm"
                                    type="outline" className='tag-left-margin'
                                >Patient Manager</Tag>
                            </HeaderName>
                            <HeaderNavigation aria-label="Diet4Life">
                                {tabs.map(tab =>
                                    <HeaderMenuItem
                                        isActive={pathname === tab.href}
                                        key={tab.name}
                                        onClick={() => router.push(tab.href)}
                                    > {tab.name}
                                    </HeaderMenuItem>)}
                            </HeaderNavigation>
                            <HeaderGlobalBar >
                                <HeaderGlobalAction
                                    onClick={() => setIsOpen(!isOpen)}
                                    tooltipAlignment="center"
                                    tooltipHighContrast
                                    isActive={isOpen}
                                    aria-labelledby="product"
                                >
                                    <Information size={20} />
                                </HeaderGlobalAction>
                            </HeaderGlobalBar>

                            <SideNav suppressHydrationWarning
                                aria-label="Side navigation"
                                expanded={isSideNavExpanded}
                                isPersistent={false}
                                onSideNavBlur={onClickSideNavExpand}
                            >
                                <SideNavItems>
                                    <HeaderSideNavItems>
                                        {tabs.map(tab => <HeaderMenuItem
                                            isActive={pathname === tab.href}
                                            key={tab.name}
                                            onClick={() => router.push(tab.href)}
                                        > {tab.name}
                                        </HeaderMenuItem>)}
                                    </HeaderSideNavItems>
                                </SideNavItems>
                            </SideNav>
                        </Header>
                        {isOpen && Model}
                    </div>
                )}
            /></Theme>
    );
};